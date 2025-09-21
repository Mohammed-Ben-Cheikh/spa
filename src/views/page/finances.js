const Finances = () => `
  <div class="sup-content">
    <div class="container">

      <div class="statis">
        <div class="statis-item">Recettes</div>
        <div class="statis-item">Dépenses</div>
        <div class="statis-item">Budget</div>
      </div>

      <!-- Modal Ajouter Entrée -->
      <div class="modal" id="addEntryModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="entry-modal-title">Ajouter une entrée</h2>
            <span class="close-modal" id="close-entry-modal">&times;</span>
          </div>
          <div class="modal-body">
            <form id="financeForm">
              <div class="form-group">
                <label for="entryType">Type d'entrée</label>
                <select id="entryType" class="input-text">
                  <option value="income">Recette</option>
                  <option value="expense">Dépense</option>
                </select>
              </div>
              <div class="form-group">
                <label for="amount">Montant</label>
                <input id="amount" type="number" placeholder="Montant" class="input-text">
              </div>
              <div class="form-group">
                <label for="label">Libellé</label>
                <input id="label" type="text" placeholder="Libellé" class="input-text">
              </div>
              <div class="form-group">
                <label for="category">Catégorie (dépense)</label>
                <input id="category" type="text" placeholder="Catégorie (dépense)" class="input-text">
              </div>
              <div class="form-group">
                <label for="method">Méthode de paiement (recette)</label>
                <input id="method" type="text" placeholder="Méthode de paiement (recette)" class="input-text">
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input id="date" type="date" class="input-text">
              </div>
              <button type="submit" class="btn-submit" id="btn-add-entry">Enregistrer</button>
            </form>
          </div>
        </div>
      </div>

      <div class="patients">
        <div class="patient-header">
          <button class="btn-add" id="btn-add">Ajouter une entrée</button>
          <input id="month" type="month" class="input-text">
          <input id="budgetTarget" type="number" placeholder="Objectif mensuel" class="input-text">
          <button class="btn-add" id="btn-save-budget">Enregistrer objectif</button>
        </div>

        <table class="patients-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Montant</th>
              <th>Détails</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="financeBody"></tbody>
        </table>
      </div>
    </div>
  </div>
`;
export default Finances;
