<template>
  <div v-if="authdUser === null">
    <button @click="performAuth">Register / Login</button>
  </div>
  <div v-else><button @click="logout">Log Out</button></div>
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data() {
    return {
      authdUser: null,
      error: null,
    };
  },
  emits: ["authIn", "authOut"],
  methods: {
    performAuth() {
      var that = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          var user = result.user;
          that.authdUser = user;
          that.$emit("auth-in", user);
        })
        .catch(function (error) {
          that.error = error.message;
        });
    },
    logout() {
      var that = this;
      firebase
        .auth()
        .signOut()
        .then(function () {
          console.log("sign out worked");
          that.authdUser = null;
          that.$emit("auth-out");
        })
        .catch(function (error) {
          console.log("error occured: " + error.message);
          that.error = error.message;
        });
    },
  },
};
</script>

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
</style>