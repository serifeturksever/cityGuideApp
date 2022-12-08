<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
    name: "App",
    components: { Navbar }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
