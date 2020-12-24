<template>
  <br /><br />
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
import { useStore } from "../store";

export default {
  name: "History",
  setup() {
    return { store: useStore() };
  },
  data() {
    return {
      display: false,
      uiHist: [],
    };
  },
  beforeMount() {
    this.buildUIHist();
  },
  methods: {
    buildUIHist() {
      var userData = this.store.getState().userData;

      function comp(a, b) {
        return a - b;
      } 

      const sortedData = { days: [] };

      var patt = new RegExp("^[0-9]");

      Object.keys(userData.days)
        .sort(comp)
        .forEach((dateIdx) => {
          if (patt.test(dateIdx)) {
            sortedData.days[dateIdx] = userData.days[dateIdx];
          }
        });

      userData = sortedData;

      Object.keys(userData.days).forEach((dateIdx) => {
        const date = dateIdx;
        const sets = userData.days[date].sets;
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
