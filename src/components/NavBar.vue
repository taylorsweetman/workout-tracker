<template>
  <div class="row">
    <router-link to="/home">Home</router-link>
    <router-link to="/history">History</router-link>
    <button class="box">Sign in</button>
  </div>
  <router-view />

  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
   -->
</template>

<script>
export default {
  name: "NavBar",
};
</script>