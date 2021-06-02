<template>
  <div class="app">
    <Nav/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from './components/partials/Nav.vue'

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

export default {
  name: "App",
  components: {
    Nav
  }
};
</script>

<style lang="scss">

</style>
