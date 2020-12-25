<template>
  <nav-bar @new-user="addUserDataToStore"></nav-bar>
  <write-firebase></write-firebase>
  <p><strong>STORE DATA: </strong>{{ store.getState().userData }}</p>
</template>

<script>
import NavBar from "./components/NavBar";
import { useStore } from "./store";
import firebase from "firebase/app";
import "firebase/firestore";
import WriteFirebase from "./utils/WriteFirebase";

export default {
  name: "App",
  setup() {
    return { store: useStore() };
  },
  components: {
    NavBar,
    WriteFirebase,
  },
  methods: {
    //TODO, extract the db variable
    addUserDataToStore() {
      var that = this;
      var db = firebase.firestore();
      const uid = that.store.getState().user.uid;
      var docRef = db.collection("histories").doc(uid);
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
    },
  },
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
