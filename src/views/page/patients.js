const Patients = () => `
 <div class="sup-content">
  <div class="container">

    <!-- Statistiques -->
    <div class="statis">
      <div class="statis-item">Patients</div>
      <div class="statis-item">Rendez-vous</div>
      <div class="statis-item">Taux no-show</div>
    </div>

    <!-- Modal Ajouter/Modifier Patient -->
    <div class="modal" id="addPatientModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-title"></h2>
          <span class="close-modal" id="close-modal">&times;</span>
        </div>
        <div class="modal-body">
          <form id="patientForm">
            <div class="form-group">
              <label for="fullName">Nom complet</label>
              <input type="text" id="fullName" required>
            </div>
            <div class="form-group">
              <label for="phone">Téléphone</label>
              <input type="tel" id="phone" placeholder="06 12 34 56 78">
            </div>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input type="email" id="email" placeholder="exemple@mail.com">
            </div>
            <div class="form-group">
              <label for="notes">Notes</label>
              <input type="text" id="notes" placeholder="Allergies, antécédents...">
            </div>
            <button type="submit" class="btn-submit">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Historique Rendez-vous -->
    <div class="modal" id="historyModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Historique des rendez-vous</h2>
          <span class="close-modal" id="close-history">&times;</span>
        </div>
        <div class="modal-body">
          <table class="history-patients-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Heure</th>
                <th>Praticien</th>
                <th>Salle</th>
                <th>Type</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody id="historyBody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="patients">

      <div class="patient-header">
        <input id="input-text" type="text" placeholder="Recherche: nom ou téléphone" class="input-text">
        <button class="btn-add" id="btn-add">Ajouter patient</button>
      </div>

      <table class="patients-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>E-mail</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>

  </div>
</div>

`;
export default Patients;
