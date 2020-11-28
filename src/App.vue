<template>
  <div><h1>Taylor's Workout App</h1></div>
  <div class="row">
    <exercise-session
      v-for="(session, idx) in sessions"
      :key="idx"
      :active="session.active"
      :name="session.name"
      @selected-state="activateChild(idx)"
    />
  </div>
  <div class="row" v-if="!noneActive">
    <exercise-session class="box" name="<-" @click="selectedSession = ''" />
  </div>
  <div class="row"><History class="box" /></div>
</template>

<script>
import ExerciseSession from "./components/ExerciseSession.vue";
import History from "./components/History.vue";

export default {
  name: "App",
  components: {
    ExerciseSession,
    History,
  },
  data() {
    return {
      sessions: {
        0: { name: "Pull", active: false },
        1: { name: "Push", active: false },
        2: { name: "Legs", active: false },
      },
      noneActive: true,
    };
  },
  methods: {
    setSelected(sessionName) {
      this.selectedSession = sessionName;
    },
    activateChild(idx) {
      this.noneActive = false;
      var val = this.sessions[idx];
      val.active = true;
      this.sessions[idx] = val;
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
