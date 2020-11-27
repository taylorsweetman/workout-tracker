<template>
  <button @click="select">
    <h1>{{ name }}</h1>
  </button>
</template>

<script>
export default {
  name: "ExerciseSession",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["selected-state"],
  methods: {
    select() {
      this.$emit("selected-state", this.name);
    },
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
