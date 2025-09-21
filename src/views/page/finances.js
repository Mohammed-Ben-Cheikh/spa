const Finances = () => `
  <div class="sup-content">
    <div class="container">

      <div class="statis">
        <div class="statis-item">Recettes</div>
        <div class="statis-item">Dépenses</div>
        <div class="statis-item">Budget</div>
      </div>

      <div class="patients">
        <div class="patient-header">
          <input id="month" type="month" class="input-text">
          <input id="budgetTarget" type="number" placeholder="Objectif mensuel" class="input-text">
          <button class="btn-add" id="btn-save-budget">Enregistrer objectif</button>
        </div>

        <div class="patient-header">
          <select id="entryType" class="input-text">
            <option value="income">Recette</option>
            <option value="expense">Dépense</option>
          </select>
          <input id="amount" type="number" placeholder="Montant" class="input-text">
          <input id="label" type="text" placeholder="Libellé" class="input-text">
          <input id="category" type="text" placeholder="Catégorie (dépense)" class="input-text">
          <input id="method" type="text" placeholder="Méthode de paiement (recette)" class="input-text">
          <input id="date" type="date" class="input-text">
          <button class="btn-add" id="btn-add-entry">Ajouter</button>
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
