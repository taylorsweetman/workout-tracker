<template>
  <button @click="toggleDone" :class="finished ? 'finished' : ''">
    <h1>{{ exerciseName }}</h1>
    <h1>Reps: {{ reps }} </h1>
  </button>
</template>

<script>
export default {
  name: "Set",
  props: {
    exerciseName: String,
    setNum: Number,
    reps: Number,
  },
  data() {
    return {
      finished: false
    }
  },
  methods: {
    toggleDone() {
      this.finished = !this.finished;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
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
.finished {
  background-color: #42b983;
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
