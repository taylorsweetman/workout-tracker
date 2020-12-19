<template>
  <div class="row">
    <router-link to="/home" class="box">Home</router-link>
    <router-link to="/history" class="box">History</router-link>
    <auth></auth>
  </div>
  <router-view />
</template>

<script>
import Auth from "./Auth.vue";

export default {
  name: "NavBar",
  components: { Auth },
};
</script>

<style scoped>
</style>
