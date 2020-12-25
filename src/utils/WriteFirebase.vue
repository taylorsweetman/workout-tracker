<template>
  <button @click="writeData">write mock data</button>
</template>

<script>
import { useStore } from "../store";
import dataObj from "../mock_data";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  setup() {
    return {
      store: useStore(),
    };
  },
  methods: {
    writeData() {
      this.updateFirebaseData();
    },
    updateFirebaseData() {
      const uid = this.store.getState().user.uid;
      var db = firebase.firestore();
      db.collection("histories")
        .doc(uid)
        .set(dataObj)
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
  },
};
</script>