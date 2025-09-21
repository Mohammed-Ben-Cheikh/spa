const Login = () => `
  <div class="login-container">
    <h1 id="login-title">Authentification</h1>
    <form id="login-form">
      <div class="field">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" autocomplete="current-password" required />
      </div>
      <div class="field" id="confirm-field" style="display:none;">
        <label for="confirm">Confirmer le mot de passe</label>
        <input type="password" id="confirm" autocomplete="new-password" />
      </div>
      <button type="submit" id="submit-btn">Se connecter</button>
      <p class="hint" id="hint"></p>
      <p class="error" id="error" style="display:none;"></p>
    </form>
  </div>
`;
export default Login;
