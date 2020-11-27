<template>
  <div><h1>Taylor's Workout App</h1></div>
  <div class="row" v-if="selectedSession === ''">
    <exercise-session class="box" name="Push" @selected-state="setSelected" />
    <exercise-session class="box" name="Pull" @selected-state="setSelected" />
    <exercise-session class="box" name="Legs" @selected-state="setSelected" />
  </div>
  <div class="row" v-else>
    <exercise-session class="box" name="<-" @click="selectedSession = ''" />
  </div>
  <div class="row" v-if="selectedSession === 'Pull'">
    <Set class="box" exercise-name="Pull Ups" :setNum="1" :reps="4" />
    <Set class="box" exercise-name="Pull Ups" :setNum="2" :reps="4" />
    <Set class="box" exercise-name="Pull Ups" :setNum="3" :reps="3" />
  </div>
  <div class="row" v-else-if="selectedSession === 'Push'">
    <Set class="box" exercise-name="Push Ups" :setNum="1" :reps="10" />
    <Set class="box" exercise-name="Push Ups" :setNum="2" :reps="10" />
    <Set class="box" exercise-name="Push Ups" :setNum="3" :reps="10" />
  </div>
  <div class="row" v-else-if="selectedSession === 'Legs'">
    <Set class="box" exercise-name="Squats" :setNum="1" :reps="10" />
    <Set class="box" exercise-name="Squats" :setNum="2" :reps="10" />
    <Set class="box" exercise-name="Squats" :setNum="3" :reps="10" />
  </div>
  <div class="row"><History class="box" /></div>
</template>

<script>
import ExerciseSession from "./components/ExerciseSession.vue";
import History from "./components/History.vue";
import Set from "./components/Set.vue";

export default {
  name: "App",
  components: {
    ExerciseSession,
    History,
    Set,
  },
  data() {
    return {
      selectedSession: "",
    };
  },
  methods: {
    setSelected(sessionName) {
      this.selectedSession = sessionName;
    },
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
