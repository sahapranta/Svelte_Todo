<style>
  nav {
    border-top: 2px solid salmon;
  }
</style>
<nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="todo.png" alt="todo" /> &nbsp;<b>TODO APP</b>
    </a>

    <a href="#"
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbar"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbar" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <button class="button is-primary">
            <strong>Sign up</strong>
          </button>
          <button class="button is-light">
            Log in
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
