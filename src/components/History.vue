<template>
  <button @click="toggleDisplay">View History</button>
  <p v-if="display">
    {{ hist }}
  </p>
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
    };
  },
  methods: {
    toggleDisplay() {
      this.display = !this.display;
    },
  },
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
