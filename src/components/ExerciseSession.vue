<template>
  <button v-if="!active" class="box" @click="select">
    <h1>{{ name }}</h1>
  </button>
  <section v-if="this.active">
    <div class="row">
      <Set
        v-for="(set, idx) in todayData.sets"
        :key="idx"
        :exercise-name="set.exercise"
        :setNum="idx + 1"
        :reps="set.reps"
      />
    </div>
    <button @click="finished">Done!</button>
  </section>
</template>

<script>
import Set from "../components/Set.vue";
/* var today = new Date().toJSON().slice(0,10); */
export default {
  name: "ExerciseSession",
  components: {
    Set,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
    dataObj: {
      type: Object,
    },
  },
  data() {
    return {
      todayData: {},
    };
  },
  beforeMount() {
    if (this.active) {
      this.runDataCalcs(this.name);
    }
  },
  watch: {
    active(val) {
      if (!val) {
        this.todayData = {};
      }
    },
  },
  emits: ["selectedState", "doneWorkout"],
  methods: {
    select() {
      this.$emit("selected-state");
    },
    finished() {
      this.$emit("done-workout");
    },
    runDataCalcs(seshName) {
      const lastDayData = this.findLastDataPt(seshName);
      const totalReps = this.getTotalRepsFromDay(lastDayData);
      const todayReps = this.findSetReps(totalReps);
      const todayData = this.prepData(lastDayData, todayReps);
      this.todayData = todayData;
    },
    findLastDataPt(seshName) {
      for (var key in this.dataObj.days) {
        var nextDayData = this.dataObj.days[key];
        const seshType = nextDayData.seshType;
        if (seshType === seshName) {
          return nextDayData;
        }
      }
      return null;
    },
    getTotalRepsFromDay(dayData) {
      var totalReps = 0;
      if (dayData !== null) {
        for (const idx in dayData.sets) {
          const nextReps = dayData.sets[idx].reps;
          totalReps += nextReps;
        }
      }
      return totalReps;
    },
    findSetReps(previousTotal) {
      const goalTotal = previousTotal + 1;
      const div = Math.floor(goalTotal / 3);
      let rem = goalTotal % 3;

      let tuple = [div, div, div];

      for (var i = 0; rem > 0; rem--) {
        tuple[i] = tuple[i] + 1;
        i++;
      }

      return tuple;
    },
    prepData(lastDayData, todaySetTuple) {
      const lastDaySets = lastDayData.sets;
      lastDaySets[0].reps = todaySetTuple[0];
      lastDaySets[1].reps = todaySetTuple[1];
      lastDaySets[2].reps = todaySetTuple[2];
      return lastDayData;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
