<template>
  <nav-bar @new-user="addUserDataToStore"></nav-bar>
</template>

<script>
import NavBar from "./components/NavBar";
import firebase from "firebase/app";
import "firebase/firestore";
import { useStore } from "./store";

export default {
  name: "App",
   setup() {
    return { store: useStore() };
  },
  components: {
    NavBar,
  },
  methods: {
    addUserDataToStore() {
      var that = this;
      var db = firebase.firestore();
      var docRef = db.collection("histories").doc(this.store.getState().user.uid);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            that.store.setUserData(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
