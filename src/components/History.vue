<template>
  <div class="diff-col">
    <p>View History</p>
  </div>
</template>

<script>
export default {
  name: "History",
  props: {
    hist: Object
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.diff-col {
  background-color: #30475e;
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
