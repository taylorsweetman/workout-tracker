<template>
  <div v-if="authdUser === null">
    <button @click="performAuth">Register / Login</button>
  </div>
  <div v-else><button @click="logout">Log Out</button></div>

  <button @click="getUserDoc">Get User Data</button>
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
  watch: {
    // TODO --> figure out this await/async stuff below
    async authdUser(val) {
      if (val !== null) {
        console.log("val.uid:", val.uid);
        const userData = await this.getUserDoc(val.uid);
        console.log("userData:", userData);
        this.$emit("doc-load", userData);
      }
    },
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
          that.$emit("auth-in", user);
          console.log("uid:", user.uid);
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
          // Sign-out successful.
          console.log("sign out worked");
          that.authdUser = null;
        })
        .catch(function (error) {
          // An error happened.
          console.log("error occured: " + error.message);
          that.error = error.message;
        });
    },
    getUserDoc(uid) {
      var db = firebase.firestore();
      var docRef = db.collection("histories").doc(uid);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("docData: ", doc.data());
            return doc.data();
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