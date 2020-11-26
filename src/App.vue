<template>
  <div><h1>Taylor's Workout App</h1></div>
  <div class="row">
    <ExerciseType class="box" name="Pull Ups" />
    <ExerciseType class="box" name="Push Ups" />
    <ExerciseType class="box" name="Squats" />
  </div>
  <Set class="box" :setNum="1" :reps="10.0" />
  <div class="row"><History class="box" /></div>
</template>

<script>
import ExerciseType from "./components/ExerciseType.vue";
import History from "./components/History.vue";
import Set from "./components/Set.vue";

export default {
  name: "App",
  components: {
    ExerciseType,
    History,
    Set,
  },
};
</script>

<style>
.box {
  display: inline-block;
  margin: 1%;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem;
  border-radius: 10px;
  padding: 1rem;
  background-color: #0caeca;
  color: white;
  text-align: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
