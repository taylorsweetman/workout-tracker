<template>
  <button>
    <h1>{{ name }}</h1>
  </button>
</template>

<script>
export default {
  name: "ExerciseType",
  props: {
    name: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
