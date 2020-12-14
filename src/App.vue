<template>
  <div><h1>Taylor's Workout App</h1></div>
  <div class="row" v-if="selectedIdx !== -1">
    <button class="box" @click="reset">Back</button>
  </div>
  <div class="row">
    <div v-if="selectedIdx !== -1">
      <exercise-session
        :active="true"
        :data-obj="userData"
        :name="sessions[selectedIdx].name"
      ></exercise-session>
    </div>
    <div v-else>
      <exercise-session
        v-for="(session, idx) in sessions"
        :key="idx"
        :active="session.active"
        :name="session.name"
        @selected-state="activateChild(idx)"
      />
    </div>
  </div>

  <div v-if="userData !== null" class="row"><History :hist="userData" class="box" /></div>
  <auth @auth-in="popData($event)" @auth-out="unPopData()"></auth>
</template>

<script>
import ExerciseSession from "./components/ExerciseSession.vue";
import History from "./components/History.vue";
import Auth from "./components/Auth.vue";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "App",
  components: {
    ExerciseSession,
    History,
    Auth,
  },
  data() {
    return {
      sessions: {
        0: { name: "Push", active: false },
        1: { name: "Pull", active: false },
        2: { name: "Legs", active: false },
      },
      appUser: null,
      userData: null,
      selectedIdx: -1,
    };
  },
  methods: {
    activateChild(idx) {
      // find session
      this.selectedIdx = idx;
      var sesh = this.sessions[idx];

      // change active value, and update array
      sesh.active = true;
      this.sessions[idx] = sesh;
    },
    reset() {
      for (var idx in this.sessions) {
        this.sessions[idx].active = false;
      }
      this.selectedIdx = -1;
    },
    popData(user) {
      this.appUser = user;
      this.getUserDoc(user.uid);
    },
    unPopData() {
      this.appUser = null;
      this.userData = null;
    },
    getUserDoc(uid) {
      var that = this;
      var db = firebase.firestore();
      var docRef = db.collection("histories").doc(uid);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            that.setUserData(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },
    setUserData(userDataLocal) {
      this.userData = userDataLocal;
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

<style>
h1 {
  color: #222831;
}
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #e8e8e8;
}
</style>
