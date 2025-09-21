import db from "../utils/Medo.js";

const COLLECTION = "patients";
const APPTS = "appointments";

function getAllPatients() {
  return db.getCollection(COLLECTION);
}

console.log(getAllPatients());
function setPatientsTable(patients) {
  const tbody = document.querySelector(".patients-table tbody");
  console.log(tbody);
  tbody.innerHTML = patients
    .map(
      (p) => `
        <tr>
          <td>${p.fullName || p.name || ""}</td>
          <td>${p.phone || ""}</td>
          <td>${p.email || ""}</td>
          <td>${p.notes || p.diagnosis || ""}</td>
          <td>
            <button class="btn-history" data-id="${p.id}">Historique</button>
            <button class="btn-edit" data-id="${p.id}">Modifier</button>
            <button class="btn-delete" data-id="${p.id}">Supprimer</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function refreshPatientsTable() {
  setPatientsTable(getAllPatients());
}

// Elements
const modal = document.getElementById("addPatientModal");
const btnAdd = document.getElementById("btn-add");
const closeBtn = document.getElementById("close-modal");
const patientForm = document.getElementById("patientForm");
const inputText = document.getElementById("input-text");
const historyModal = document.getElementById("historyModal");
const closeHistory = document.getElementById("close-history");
const historyBody = document.getElementById("historyBody");

let editingId = null;

// Open modal for add
btnAdd?.addEventListener("click", () => {
  document.getElementById("modal-title").textContent =
    "Ajouter un nouveau patient";
  patientForm.reset();
  editingId = null;
  modal.style.display = "block";
});

// Close modal
closeBtn?.addEventListener("click", () => (modal.style.display = "none"));
closeHistory?.addEventListener(
  "click",
  () => (historyModal.style.display = "none")
);

window.addEventListener("click", (event) => {
  if (event.target === modal) modal.style.display = "none";
  if (event.target === historyModal) historyModal.style.display = "none";
});

// Table actions
document
  .querySelector(".patients-table tbody")
  ?.addEventListener("click", (e) => {
    const id = e.target.dataset?.id;
    if (!id) return;

    if (e.target.classList.contains("btn-edit")) {
      const p = db.getById(id, COLLECTION);
      if (!p) return;
      editingId = id;
      document.getElementById("fullName").value = p.fullName || p.name || "";
      document.getElementById("phone").value = p.phone || "";
      document.getElementById("email").value = p.email || "";
      document.getElementById("notes").value = p.notes || "";
      document.getElementById("modal-title").textContent = "Modifier patient";
      modal.style.display = "block";
    } else if (e.target.classList.contains("btn-delete")) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
        db.remove(id, COLLECTION);
        refreshPatientsTable();
      }
    } else if (e.target.classList.contains("btn-history")) {
      showHistory(id);
    }
  });

refreshPatientsTable();
updateStats();

// Submit form
patientForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const notes = document.getElementById("notes").value.trim();

  const data = { fullName, phone, email, notes };

  if (editingId) {
    db.update(COLLECTION, editingId, data);
    editingId = null;
  } else {
    db.insert(data, COLLECTION);
  }
  refreshPatientsTable();
  updateStats();
  modal.style.display = "none";
  patientForm.reset();
});

// Search by name or phone
inputText.addEventListener("keyup", () => {
  const q = inputText.value.toLowerCase();
  const patients = getAllPatients();
  const filtered = patients.filter((p) => {
    const name = (p.fullName || p.name || "").toLowerCase();
    const phone = (p.phone || "").toLowerCase();
    return name.includes(q) || phone.includes(q);
  });
  setPatientsTable(filtered);
});

function showHistory(patientId) {
  const appts = db
    .getCollection(APPTS)
    .filter((a) => a.patientId === patientId);
  historyBody.innerHTML = appts
    .map((a) => {
      const d = new Date(a.start);
      const date = d.toLocaleDateString();
      const time = d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `
        <tr>
          <td>${date}</td>
          <td>${time}</td>
          <td>${a.practitioner || ""}</td>
          <td>${a.room || ""}</td>
          <td>${a.type || ""}</td>
          <td>${a.status || "scheduled"}</td>
        </tr>`;
    })
    .join("");
  historyModal.style.display = "block";
}

function updateStats() {
  const cards = document.querySelectorAll(".statis .statis-item");
  const patients = db.getCollection(COLLECTION);
  const appts = db.getCollection(APPTS);
  const total = appts.length;
  const noshow = appts.filter((a) => a.status === "no-show").length;
  const rate = total ? Math.round((noshow / total) * 100) : 0;
  cards[0].textContent = `Patients: ${patients.length}`;
  cards[1].textContent = `Rendez-vous: ${total}`;
  cards[2].textContent = `No-show: ${rate}%`;
}
