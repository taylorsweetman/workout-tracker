<template>
  <div class="topnav">
    <h1>Taylor's Workout App</h1>
    <router-link to="/home" class="box">Home</router-link>
    <router-link to="/history" class="box">History</router-link>
    <auth class="box"></auth>
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
/* Add a black background color to the top navigation */
h1 {
  color: white;
}

.topnav {
  background-color: #30475e;
  overflow: hidden;
  border-radius: 10px;
}

/* Style the links inside the navigation bar */
.topnav .box {
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: inline-block;
}

/* Change the color of links on hover */
.topnav .box:hover {
  background-color: #ddd;
  color: black;
  cursor: pointer;
}

/* Add a color to the active/current link */
.topnav .box.active {
  background-color: #f05454;
  color: white;
}
</style>
