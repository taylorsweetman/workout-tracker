<template>
  <div v-if="authdUser === null" class="box" @click="performAuth">
    Register / Login
  </div>
  <div v-else class="box" @click="logout">Log Out</div>
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
        .then((result) => {
          var user = result.user;
          that.authdUser = user;
          that.$emit("auth-in", user);
        })
        .catch((error) => {
          that.error = error.message;
        });
    },
    logout() {
      var that = this;
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("sign out worked");
          that.authdUser = null;
          that.$emit("auth-out");
        })
        .catch((error) => {
          console.log("error occured: " + error.message);
          that.error = error.message;
        });
    },
  },
};
</script>

<style scoped>
.box {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  padding: 1rem;
  background-color: #f05454;
  color: white;
}
</style>