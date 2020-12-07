<template>
  <button @click="submit">Register / Login</button>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log("token", token);
          // The signed-in user info.
          var user = result.user;
          console.log("user", user);
          console.log("uid", user.uid);
        })
        .catch(function (error) {
          this.error = error.message;
        });

      /* firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {});
        })
        .catch((err) => {
          this.error = err.message;
        }); */
    },
  },
};
</script>