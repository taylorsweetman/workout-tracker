<template>
  <div class="row" v-show="store.getState().userData !== null">
    <router-link
      :to="{ name: 'ExerciseSession', params: { localName: exerciseTuple[0] } }"
      class="box"
      >{{ exerciseTuple[0] }}</router-link
    >
    <router-link
      :to="{ name: 'ExerciseSession', params: { localName: exerciseTuple[1] } }"
      class="box"
      >{{ exerciseTuple[1] }}</router-link
    >
    <router-link
      :to="{ name: 'ExerciseSession', params: { localName: exerciseTuple[2] } }"
      class="box"
      >{{ exerciseTuple[2] }}</router-link
    >
  </div>
  <router-view />
</template>

<script>
import { useStore } from "../store";

export default {
  name: "Home",
  setup() {
    return { store: useStore() };
  },
  data() {
    return {
      exerciseTuple: ["push_ups", "pull_ups", "squats"],
    };
  },
};
</script>

<style>
h1 {
  color: #222831;
}
.box {
  display: inline-block;
  margin: 1%;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem;
  border-radius: 10px;
  padding: 1rem;
  background-color: #f05454;
  color: white;
  text-align: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #e8e8e8;
}
</style>
