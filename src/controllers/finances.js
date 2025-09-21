import db from "../utils/Medo.js";

const FIN = "finances"; // entries
const SETTINGS = "settings"; // for budget per month

const monthEl = document.getElementById("month");
const budgetTargetEl = document.getElementById("budgetTarget");
const saveBudgetBtn = document.getElementById("btn-save-budget");

const entryType = document.getElementById("entryType");
const amount = document.getElementById("amount");
const label = document.getElementById("label");
const category = document.getElementById("category");
const method = document.getElementById("method");
const dateEl = document.getElementById("date");
const addEntryBtn = document.getElementById("btn-add-entry");
const financeBody = document.getElementById("financeBody");
// Modal elements
const entryModal = document.getElementById("addEntryModal");
const openEntryBtn = document.getElementById("btn-add");
const closeEntryBtn = document.getElementById("close-entry-modal");
const financeForm = document.getElementById("financeForm");

function currentMonthKey() {
  return (monthEl.value || new Date().toISOString().slice(0, 7)).replace(
    "-",
    ""
  );
}

function getEntries() {
  return db.getCollection(FIN);
}

function render() {
  const monthKey = currentMonthKey();
  const entries = getEntries().filter((e) =>
    (e.date || "").startsWith(
      monthEl.value || new Date().toISOString().slice(0, 7)
    )
  );
  financeBody.innerHTML = entries
    .map(
      (e) => `
				<tr>
					<td>${e.date}</td>
					<td>${e.type}</td>
					<td>${Number(e.amount).toFixed(2)} DH</td>
					<td>${e.type === "income" ? e.method || "" : e.category || ""} - ${
        e.label || ""
      }</td>
					<td>
						<button class="btn-delete" data-id="${e.id}">Supprimer</button>
					</td>
				</tr>`
    )
    .join("");

  const settings = db.getCollection(SETTINGS);
  const budget =
    settings.find((s) => s.key === `budget_${monthKey}`)?.value || 0;
  budgetTargetEl.value = budget || "";

  // Stats
  const income = entries
    .filter((e) => e.type === "income")
    .reduce((s, e) => s + Number(e.amount || 0), 0);
  const expense = entries
    .filter((e) => e.type === "expense")
    .reduce((s, e) => s + Number(e.amount || 0), 0);
  const cards = document.querySelectorAll(".statis .statis-item");
  if (cards?.length) {
    if (cards[0]) cards[0].textContent = `Recettes: ${income.toFixed(2)} DH`;
    if (cards[1]) cards[1].textContent = `Dépenses: ${expense.toFixed(2)} DH`;
    if (cards[2])
      cards[2].textContent = `Budget: ${(income - expense).toFixed(
        2
      )} / ${Number(budget).toFixed(2)} DH`;
  }
}

financeBody?.addEventListener("click", (e) => {
  const id = e.target.dataset?.id;
  if (!id) return;
  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Supprimer cette entrée ?")) {
      db.remove(id, FIN);
      render();
    }
  }
});

// Open modal for adding entry
openEntryBtn?.addEventListener("click", () => {
  financeForm?.reset();
  // default selection
  if (entryType) entryType.value = "income";
  entryModal.style.display = "block";
});

// Close modal
closeEntryBtn?.addEventListener(
  "click",
  () => (entryModal.style.display = "none")
);
window.addEventListener("click", (event) => {
  if (event.target === entryModal) entryModal.style.display = "none";
});

// Submit entry form
financeForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const entry = {
    type: entryType.value,
    amount: Number(amount.value) || 0,
    label: label.value.trim(),
    category: category.value.trim(),
    method: method.value.trim(),
    date: dateEl.value || new Date().toISOString().slice(0, 10),
  };
  db.insert(entry, FIN);
  render();
  entryModal.style.display = "none";
  financeForm.reset();
});

saveBudgetBtn?.addEventListener("click", () => {
  const monthKey = currentMonthKey();
  const val = Number(budgetTargetEl.value) || 0;
  const settings = db.getCollection(SETTINGS);
  const existing = settings.find((s) => s.key === `budget_${monthKey}`);
  if (existing) {
    db.update(SETTINGS, existing.id, { value: val });
  } else {
    db.insert({ key: `budget_${monthKey}`, value: val }, SETTINGS);
  }
  render();
});

[monthEl].forEach((el) => el?.addEventListener("change", render));

(function init() {
  const today = new Date();
  monthEl.value = today.toISOString().slice(0, 7);
  dateEl.value = today.toISOString().slice(0, 10);
  render();
})();
