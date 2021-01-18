<template>
	<div>
		<nav-bar @new-user="addUserDataToStore" />
		<div v-if="testMode">
			<write-firebase></write-firebase>
			<button @click="wipeStore">Clear Store</button>
			<p><strong>STORE DATA: </strong>{{ store.getState().userData }}</p>
		</div>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { useStore, AppUser, UserData } from './store';
import firebase from 'firebase/app';
import 'firebase/firestore';
import WriteFirebase from './utils/WriteFirebase';

export default {
	name: 'App',
	setup() {
		return { store: useStore() };
	},
	data() {
		return {
			testMode: false
		};
	},
	components: {
		NavBar,
		WriteFirebase
	},
	methods: {
		wipeStore() {
			if (this.testMode) {
				this.store.setUser(new AppUser());
				this.store.setUserData(new UserData());
			}
		},
		addUserDataToStore() {
			if (this.testMode) {
				var that = this;
				var db = firebase.firestore();
				const uid = that.store.getState().user.uid;
				var docRef = db.collection('histories').doc(uid);
				docRef
					.get()
					.then(function(doc) {
						if (doc.exists) {
							that.store.setUserData(doc.data());
						} else {
							console.log('No such document!');
						}
					})
					.catch(function(error) {
						console.log('Error getting document:', error);
					});
			}
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
