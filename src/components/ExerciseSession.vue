<template>
  <button v-if="!active" class="box" @click="select">
    <h1>{{ name }}</h1>
  </button>
  <div v-else class="box"><h1>{{ name }}</h1></div>
  <section v-if="this.active">
    <div class="row" v-if="this.name === 'Pull'">
      <Set exercise-name="Pull Ups" :setNum="1" :reps="4" />
      <Set exercise-name="Pull Ups" :setNum="2" :reps="4" />
      <Set exercise-name="Pull Ups" :setNum="3" :reps="3" />
    </div>
    <div class="row" v-else-if="this.name === 'Push'">
      <Set exercise-name="Push Ups" :setNum="1" :reps="10" />
      <Set exercise-name="Push Ups" :setNum="2" :reps="10" />
      <Set exercise-name="Push Ups" :setNum="3" :reps="10" />
    </div>
    <div class="row" v-else-if="this.name === 'Legs'">
      <Set exercise-name="Squats" :setNum="1" :reps="10" />
      <Set exercise-name="Squats" :setNum="2" :reps="10" />
      <Set exercise-name="Squats" :setNum="3" :reps="10" />
    </div>
  </section>
</template>

<script>
import Set from "../components/Set.vue";
export default {
  name: "ExerciseSession",
  components: {
    Set,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  emits: ["selectedState"],
  methods: {
    select() {
      this.$emit("selected-state");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
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
