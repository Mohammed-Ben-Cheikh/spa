import db from "../utils/Medo.js";

const PATIENTS = "patients";
const APPTS = "appointments";

const apptModal = document.getElementById("apptModal");
const closeAppt = document.getElementById("close-appt");
const apptForm = document.getElementById("apptForm");
const btnAddAppt = document.getElementById("btn-add-appt");
const apptBody = document.getElementById("apptBody");
const apptPatient = document.getElementById("apptPatient");
const apptPractitioner = document.getElementById("apptPractitioner");
const apptRoom = document.getElementById("apptRoom");
const apptType = document.getElementById("apptType");
const apptStart = document.getElementById("apptStart");
const apptDuration = document.getElementById("apptDuration");
const apptStatus = document.getElementById("apptStatus");
const apptModalTitle = document.getElementById("appt-modal-title");
const apptDate = document.getElementById("apptDate");
const filterPractitioner = document.getElementById("filterPractitioner");
const filterStatus = document.getElementById("filterStatus");

let editingId = null;

function loadPatientsSelect() {
  const pts = db.getCollection(PATIENTS);
  apptPatient.innerHTML = pts
    .map(
      (p) =>
        `<option value="${p.id}">${p.fullName || p.name || "Sans nom"}</option>`
    )
    .join("");
}

function populatePractitionerFilter() {
  const appts = db.getCollection(APPTS);
  const set = new Set(appts.map((a) => a.practitioner).filter(Boolean));
  filterPractitioner.innerHTML =
    `<option value="">Tous les praticiens</option>` +
    Array.from(set)
      .map((pr) => `<option value="${pr}">${pr}</option>`)
      .join("");
}

function renderTable() {
  const day = apptDate.value || new Date().toISOString().slice(0, 10);
  console.log(day);

  const startDay = new Date(`${day}T00:00:00`);
  const endDay = new Date(`${day}T23:59:59`);

  const appts = db
    .getCollection(APPTS)
    .filter((a) => {
      const d = new Date(a.start);
      return d >= startDay && d <= endDay;
    })
    .filter((a) =>
      filterStatus.value ? a.status === filterStatus.value : true
    )
    .filter((a) =>
      filterPractitioner.value
        ? a.practitioner === filterPractitioner.value
        : true
    )
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  const ptsIndex = Object.fromEntries(
    db.getCollection(PATIENTS).map((p) => [p.id, p.fullName || p.name || ""])
  );

  apptBody.innerHTML = appts
    .map((a) => {
      const t = new Date(a.start).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `
				<tr>
					<td>${t}</td>
					<td>${ptsIndex[a.patientId] || ""}</td>
					<td>${a.practitioner || ""}</td>
					<td>${a.room || ""}</td>
					<td>${a.type || ""}</td>
					<td>${a.status || "scheduled"}</td>
					<td>
						<button class="btn-edit" data-id="${a.id}">Modifier</button>
						<button class="btn-cancel" data-id="${a.id}">Annuler</button>
						<button class="btn-noshow" data-id="${a.id}">No-show</button>
						<button class="btn-delete" data-id="${a.id}">Supprimer</button>
					</td>
				</tr>`;
    })
    .join("");

  // Update stats cards
  const cards = document.querySelectorAll(".statis .statis-item");
  if (cards?.length) {
    const todayAll = appts.length;
    const confirmed = appts.filter((a) => a.status === "confirmed").length;
    const noshow = appts.filter((a) => a.status === "no-show").length;
    if (cards[0]) cards[0].textContent = `Aujourd'hui: ${todayAll}`;
    if (cards[1]) cards[1].textContent = `Confirmés: ${confirmed}`;
    if (cards[2]) cards[2].textContent = `No-show: ${noshow}`;
  }
}

function openModal(edit = null) {
  loadPatientsSelect();
  apptModal.style.display = "block";
  if (edit) {
    editingId = edit.id;
    apptModalTitle.textContent = "Modifier rendez-vous";
    apptPatient.value = edit.patientId || "";
    apptPractitioner.value = edit.practitioner || "";
    apptRoom.value = edit.room || "";
    apptType.value = edit.type || "";
    apptStart.value = edit.start?.slice(0, 16) || "";
    apptDuration.value = edit.duration || 30;
    apptStatus.value = edit.status || "scheduled";
  } else {
    editingId = null;
    apptModalTitle.textContent = "Créer un rendez-vous";
    apptForm.reset();
    const d = apptDate.value || new Date().toISOString().slice(0, 10);
    apptStart.value = `${d}T09:00`;
    apptDuration.value = 30;
    apptStatus.value = "scheduled";
  }
}

btnAddAppt?.addEventListener("click", () => openModal());
closeAppt?.addEventListener("click", () => (apptModal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === apptModal) apptModal.style.display = "none";
});

apptForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    patientId: apptPatient.value,
    practitioner: apptPractitioner.value.trim(),
    room: apptRoom.value.trim(),
    type: apptType.value.trim(),
    start: new Date(apptStart.value).toISOString(),
    duration: Number(apptDuration.value) || 30,
    status: apptStatus.value || "scheduled",
  };

  if (editingId) {
    db.update(APPTS, editingId, data);
    editingId = null;
  } else {
    db.insert(data, APPTS);
  }
  apptModal.style.display = "none";
  renderTable();
  populatePractitionerFilter();
});

apptBody?.addEventListener("click", (e) => {
  const id = e.target.dataset?.id;
  if (!id) return;
  const appt = db.getById(id, APPTS);
  if (!appt) return;
  if (e.target.classList.contains("btn-edit")) {
    openModal(appt);
  } else if (e.target.classList.contains("btn-cancel")) {
    db.update(APPTS, id, { status: "cancelled" });
    renderTable();
  } else if (e.target.classList.contains("btn-noshow")) {
    db.update(APPTS, id, { status: "no-show" });
    renderTable();
  } else if (e.target.classList.contains("btn-delete")) {
    if (confirm("Supprimer ce rendez-vous ?")) {
      db.remove(id, APPTS);
      renderTable();
      populatePractitionerFilter();
    }
  }
});

// Filters
[apptDate, filterPractitioner, filterStatus].forEach((el) =>
  el?.addEventListener("change", renderTable)
);

// Init
(function init() {
  const today = new Date().toISOString().slice(0, 10);
  if (apptDate) apptDate.value = today;
  populatePractitionerFilter();
  renderTable();
})();
