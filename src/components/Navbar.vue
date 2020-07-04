<template>
    <nav>
    <div class="nav-wrapper">
      <div class="container">
        <router-link to="/" clrouter-linkss="brand-logo">Personal Journal App</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/new_entry">New Entry</router-link></li>
            <li><router-link to="/" @click='logout'>Logout</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
            window.localStorage.removeItem('auth-token')
        }
  }
}
</script>

<style scoped>
.nav-wrapper {
  background-color: teal;
}
</style>