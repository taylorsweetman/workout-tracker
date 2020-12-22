<template>
  <br /><br />
  <p>hello tay: {{ state }}</p>
  <button @click="state.counter++">increment</button>
  <div class="div-table">
    <div class="div-table-row-head">
      <div class="div-table-col">Date</div>
      <div class="div-table-col">Exercise</div>
      <div class="div-table-col">Set 1 Reps</div>
      <div class="div-table-col">Set 2 Reps</div>
      <div class="div-table-col">Set 3 Reps</div>
    </div>
    <div class="div-table-row" v-for="day in uiHist" :key="day.date">
      <div class="div-table-col">{{ day.date }}</div>
      <div class="div-table-col">{{ day.exercise }}</div>
      <div class="div-table-col">{{ day.set1reps }}</div>
      <div class="div-table-col">{{ day.set2reps }}</div>
      <div class="div-table-col">{{ day.set3reps }}</div>
    </div>
  </div>
</template>

<script>
import dataObj from "../data";
import { useState } from "../store";

export default {
  name: "History",
  setup() {
    return { state: useState() };
  },
  data() {
    return {
      display: false,
      uiHist: [],
      // TODO use the store instead of this.hist.days
      hist: dataObj,
    };
  },
  beforeMount() {
    this.buildUIHist();
  },
  methods: {
    buildUIHist() {
      // TODO use the store instead of this.hist.days
      Object.keys(this.hist.days).forEach((dateIdx) => {
        const date = dateIdx;
        const sets = this.hist.days[date].sets;
        const exercise = sets[0].exercise;
        const set1reps = sets[0].reps;
        const set2reps = sets[1].reps;
        const set3reps = sets[2].reps;
        var objToAdd = {
          date: date,
          exercise: exercise,
          set1reps: set1reps,
          set2reps: set2reps,
          set3reps: set3reps,
        };
        this.uiHist.push(objToAdd);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.div-table {
  display: table;
  width: auto;
  margin: 0 auto;
}
.div-table-row {
  display: table-row;
  width: auto;
  clear: both;
  background-color: #30475e;
}
.div-table-row-head {
  display: table-row;
  width: auto;
  clear: both;
  background-color: #f05454;
  color: black;
}
.div-table-col {
  float: left;
  display: table-column;
  width: 100px;
  color: white;
}
h3 {
  margin: 40px 0 0;
}
</style>
