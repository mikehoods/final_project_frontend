<template>
    <nav>
    <div class="nav-wrapper">
      <div class="container">
        <router-link to="/" clrouter-linkss="brand-logo">Personal Journal App</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/new_entry">New Entry</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-wrapper {
  background-color: teal;
}
</style>