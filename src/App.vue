<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="row">
    <ExerciseType name="Pull Ups" />
    <ExerciseType name="Push Ups" />
    <ExerciseType name="Squats" />
  </div>
  <div class="row"><History /></div>
</template>

<script>
import ExerciseType from "./components/ExerciseType.vue";
import History from "./components/History.vue";

export default {
  name: "App",
  components: {
    ExerciseType,
    History,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
