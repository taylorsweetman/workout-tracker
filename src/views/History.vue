<template>
  <button @click="toggleDisplay">View History</button>
  <div class="div-table" v-if="display">
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
export default {
  name: "History",
  props: {
    hist: Object,
  },
  data() {
    return {
      display: false,
      uiHist: [],
    };
  },
  methods: {
    toggleDisplay() {
      this.display = !this.display;
      if (this.display) {
        this.buildUIHist();
      } else {
        this.uiHist = [];
      }
    },
    buildUIHist() {
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

  // I need a list of objs
  /*
  {
    date: "",
    exercise: "",
    set1reps: 0,
    set2reps: 1,
    set3reps: 2,
  }
  */
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
button {
  display: inline-block;
  margin: 1%;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem;
  border-radius: 10px;
  padding: 1rem;
  background-color: #30475e;
  color: white;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
