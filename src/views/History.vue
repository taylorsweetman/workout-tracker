<template>
  <div>
    <br /><br />
    <div v-if="uiHist.length > 0">
      <div class="div-table">
        <div class="div-table-row-head">
          <div class="div-table-col">Date</div>
          <div class="div-table-col">Exercise</div>
          <div class="div-table-col">Set 1</div>
          <div class="div-table-col">Set 2</div>
          <div class="div-table-col">Set 3</div>
        </div>

        <div
          class="div-table-row"
          v-for="session in uiHist"
          :key="session.date"
        >
          <div class="div-table-col">
            {{ session.date }}
          </div>
          <div class="div-table-col">
            {{ session.exercise }}
          </div>
          <div class="div-table-col">
            {{ session.sets[0] }}
          </div>
          <div class="div-table-col">
            {{ session.sets[1] }}
          </div>
          <div class="div-table-col">
            {{ session.sets[2] }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No completed workouts yet. Try one now!</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store";
import { beautifyStr } from "../utils/StringUtils";

export default {
  name: "History",
  setup() {
    return { store: useStore() };
  },
  data() {
    return {
      uiHist: [],
      beautifyStr: beautifyStr,
    };
  },
  beforeMount() {
    this.buildUIHist();
  },
  methods: {
    buildUIHist() {
      var userData = this.store.getState().userData;
      var pattern = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}");

      for (const session of userData.days) {
        const date = session.date;
        if (pattern.test(date)) {
          const exercise = session.exercise;
          const set1reps = session.sets[0];
          const set2reps = session.sets[1];
          const set3reps = session.sets[2];
          const objToAdd = {
            date: date,
            exercise: beautifyStr(exercise),
            sets: [set1reps, set2reps, set3reps],
          };
          this.uiHist.unshift(objToAdd);
        }
      }
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
