const Layout = () => `
  <div class="main-block" >
    <header class="header">
    <img src="/public/logo.png" alt="">
    </header>
    <main class="sup-main-block">
      <nav class="sidebar">
        <ul class="sidebar-items" id="nav-ul"></ul>
        <button id="logout-btn">Déconnexion</button>
      </nav>
      <section class="content" id="content"></section>
    </main>
  </div>
`;

export default Layout;
