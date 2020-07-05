<template>
<nav class="navbar constainer z-depth-3" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item nav-title" href="/">Dear Diary<span class="nav-subtitle">A journal app</span></a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbar" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item"><i class="material-icons">home</i>Home</router-link>
      <router-link to="/new_entry" class="navbar-item"><i class="material-icons">add</i>New Entry</router-link>
      <div>
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading" class="navbar-item">
          <!-- show login when not authenticated -->
          <a v-if="!$auth.isAuthenticated" @click="login" class="button is-dark"><i class="material-icons">fingerprint</i>Sign in</a>
          <!-- show logout when authenticated -->
          <a v-if="$auth.isAuthenticated" @click="logout" class="button is-dark"><i class="material-icons">exit_to_app</i>Log out</a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  name: 'Nav',
  methods: {
  // Log the user in
  login() {
    this.$auth.loginWithRedirect();
  },
  // Log the user out
  logout() {
    this.$auth.logout({
      returnTo: window.location.origin
    });
  }
  }
}
</script>
<style lang="scss" scoped>
  nav {
    margin-top: 4vh;
    margin-bottom: 5vh;
    padding: .8rem;
    display: flex;
    background-color: teal;
    border-radius: 6px;
    justify-content: space-between;
    align-items: center;
    font-family: 'Federo', sans-serif;
    a {
      display: flex;
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #d88d00;
      }
    }
    a:hover, .navbar-item {
      cursor: pointer;
    }
    .nav-title {
      color: whitesmoke;
      text-shadow: 1.5px 1.5px black;
      font-size: 2.5rem;
      font-weight: 100;
      .nav-subtitle {
        font-size: 1.5rem;
        padding: 0 0 0 6vw;
      }
    }
    .navbar-start {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a {
        padding: 0 2vw;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
      }
    }
    .navbar-item {
      padding: .4rem;
      display: flex;
    }
  }
</style>