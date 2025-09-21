const Appointments = () => `
  <div class="sup-content">
    <div class="container">

      <div class="statis">
        <div class="statis-item">Aujourd'hui</div>
        <div class="statis-item">Confirmés</div>
        <div class="statis-item">No-show</div>
      </div>

      <!-- Modal créer/modifier rendez-vous -->
      <div class="modal" id="apptModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="appt-modal-title"></h2>
            <span class="close-modal" id="close-appt">&times;</span>
          </div>
          <div class="modal-body">
            <form id="apptForm">
              <div class="form-group">
                <label for="apptPatient">Patient</label>
                <select id="apptPatient"></select>
              </div>
              <div class="form-group">
                <label for="apptPractitioner">Praticien</label>
                <input type="text" id="apptPractitioner" required>
              </div>
              <div class="form-group">
                <label for="apptRoom">Salle</label>
                <input type="text" id="apptRoom">
              </div>
              <div class="form-group">
                <label for="apptType">Type</label>
                <input type="text" id="apptType" placeholder="Consultation, Contrôle...">
              </div>
              <div class="form-group">
                <label for="apptStart">Début</label>
                <input type="datetime-local" id="apptStart" required>
              </div>
              <div class="form-group">
                <label for="apptDuration">Durée (min)</label>
                <input type="number" id="apptDuration" value="30" min="5" step="5">
              </div>
              <div class="form-group">
                <label for="apptStatus">Statut</label>
                <select id="apptStatus">
                  <option value="scheduled">Planifié</option>
                  <option value="confirmed">Confirmé</option>
                  <option value="done">Terminé</option>
                  <option value="cancelled">Annulé</option>
                  <option value="no-show">No-show</option>
                </select>
              </div>
              <button type="submit" class="btn-submit">Enregistrer</button>
            </form>
          </div>
        </div>
      </div>

      <div class="patients">
        <div class="patient-header">
          <input id="apptDate" type="date" class="input-text">
          <select id="filterPractitioner" class="input-text"></select>
          <select id="filterStatus" class="input-text">
            <option value="">Tous les statuts</option>
            <option value="scheduled">Planifié</option>
            <option value="confirmed">Confirmé</option>
            <option value="done">Terminé</option>
            <option value="cancelled">Annulé</option>
            <option value="no-show">No-show</option>
          </select>
          <button class="btn-add" id="btn-add-appt">Créer rendez-vous</button>
        </div>

        <table class="patients-table">
          <thead>
            <tr>
              <th>Heure</th>
              <th>Patient</th>
              <th>Praticien</th>
              <th>Salle</th>
              <th>Type</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="apptBody"></tbody>
        </table>
      </div>

    </div>
  </div>
`;
export default Appointments;
