<template>
  <button>
    <h1>{{ exerciseName }} - {{ setNum }} - {{ reps }}</h1>
  </button>
</template>

<script>
console.log("test");
export default {
  name: "Set",
  props: {
    exerciseName: String,
    setNum: Number,
    reps: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
