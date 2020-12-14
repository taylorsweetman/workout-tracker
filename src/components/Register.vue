<template>
  <button @click="performAuth">Register / Login</button>
  <button @click="getUserDoc">Get User Data</button>
</template>


<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      authdUser: null,
      error: null,
    };
  },
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
        })
        .catch(function (error) {
          that.error = error.message;
        });
    },
    getUserDoc() {
      var db = firebase.firestore();
      var docRef = db.collection("histories").doc(this.authdUser.uid);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },
    setUserDoc(valueObj) {
      var db = firebase.firestore();
      db.collection("histories")
        .doc(this.authdUser.uid)
        .set(valueObj)
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