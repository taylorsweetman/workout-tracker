<template>
	<div>
		<nav-bar @new-user="addUserDataToStore" />
		<div v-if="testMode">
			<write-firebase></write-firebase>
			<button @click="wipeStore">Clear Store</button>
			<p><strong>STORE DATA: </strong>{{ store.getState() }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue';
import { useStore, AppUser, UserData } from './store';
import WriteFirebase from './utils/WriteFirebase.vue';
import { defineComponent } from 'vue';

export default defineComponent({
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
		wipeStore(): void {
			if (this.testMode) {
				this.store.setUser(new AppUser());
				this.store.setUserData(new UserData());
				this.store.setConvenienceData(new UserData());
			}
		},
		// TODO - this method feels out of place. Put it with the other comp that uses firestore?
		addUserDataToStore(): void {
			var that = this;
			var db = firebase.firestore();
			const uid = that.store.getState().user.uid;
			var docRef = db.collection('histories').doc(uid);
			docRef
				.get()
				.then((doc) => {
					if (doc.exists && doc.data()) {
						const fsData: any = doc.data();
						const newData = new UserData(fsData.days);
						that.store.setUserData(newData);
						// TODO, make the parse call below async
						that.store.setConvenienceData(that.store.parseConvenienceData(newData));
					} else {
						that.handleNewUser();
					}
				})
				.catch((error) => {
					console.log('Error getting document:', error);
				});

		},

		handleNewUser(): void {
			this.$router.push('/register');
		}
	}
});
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
