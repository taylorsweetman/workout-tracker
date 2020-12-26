<template>
  <section>
    <div class="row">
      <Set
        v-for="(set, idx) in todayData.sets"
        :key="idx"
        :exercise-name="todayData.exercise"
        :setNum="idx + 1"
        :reps="set"
        @set-done="setDone"
        @set-undone="setUndone"
      />
    </div>
    <button @click="finished">Done!</button>
  </section>
</template>

<script>
import Set from "../components/Set";
import { useStore } from "../store";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "ExerciseSession",
  components: {
    Set,
  },
  props: {
    localName: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { store: useStore() };
  },
  data() {
    return {
      todayData: { sets: [] },
      repsTuple: [0, 0, 0],
    };
  },
  beforeMount() {
    this.runDataCalcs();
  },
  methods: {
    setDone(completedReps, setNum) {
      this.repsTuple[setNum - 1] = completedReps;
    },
    setUndone(setNum) {
      this.repsTuple[setNum - 1] = 0;
    },
    finished() {
      for (var i = 0; i < 3; i++) {
        this.todayData.sets[i] = this.repsTuple[i];
      }

      const storeCopy = this.store.getState().userData;
      storeCopy.days.push(this.todayData);
      this.store.setUserData(storeCopy);
      this.updateFirebaseData();
      this.$router.push("/history");
    },
    updateFirebaseData() {
      //TODO, write some error handling below
      const uid = this.store.getState().user.uid;
      const objToWrite = this.store.getState().userData;
      var db = firebase.firestore();
      db.collection("histories")
        .doc(uid)
        .set(objToWrite)
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    runDataCalcs() {
      const lastDayData = this.findLastDataPt();
      const lastDayReps = this.getTotalRepsFromDay(lastDayData);
      const newRepsTuple = this.findSetReps(lastDayReps);
      this.prepData(newRepsTuple);
    },
    findLastDataPt() {
      var daysArr = this.store.getState().userData.days;

      for (var i = daysArr.length - 1; i >= 0; i--) {
        const nextDayData = daysArr[i];
        const exercise = nextDayData.exercise;

        if (exercise === this.localName) {
          return nextDayData;
        }
      }

      return null;
    },
    getTotalRepsFromDay(lastDayData) {
      var totalReps = 0;
      if (lastDayData !== null) {
        for (const idx in lastDayData.sets) {
          const nextReps = lastDayData.sets[idx];
          totalReps += nextReps;
        }
      }
      return totalReps;
    },
    findSetReps(lastDayReps) {
      const goalTotal = lastDayReps + 1;
      const div = Math.floor(goalTotal / 3);
      let rem = goalTotal % 3;

      let tuple = [div, div, div];

      for (var i = 0; rem > 0; rem--) {
        tuple[i] = tuple[i] + 1;
        i++;
      }

      return tuple;
    },
    prepData(newRepsTuple) {
      this.todayData.sets[0] = newRepsTuple[0];
      this.todayData.sets[1] = newRepsTuple[1];
      this.todayData.sets[2] = newRepsTuple[2];

      var today = new Date().toJSON().slice(0, 10);
      this.todayData.date = today;
      this.todayData.exercise = this.localName;
    },
  },
};
</script>

<style scoped>
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
h1 {
  color: white;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
