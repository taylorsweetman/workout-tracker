<template>
	<div>
		<nav-bar @new-user="addUserDataToStore" />
		<div v-if="testMode">
			<button @click="write">Write Store to FB</button>
			<button @click="wipeStore">Clear User Data</button>
			<p><strong>STORE DATA: </strong>{{ store.getState() }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue';
import { useStore, UserData } from './store';
import { readUserDataById, writeUserData } from './services/FirebaseService';
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
		NavBar
	},
	methods: {
		wipeStore(): void {
			if (this.testMode) {
				this.store.setUserData(new UserData());
				this.store.setConvenienceData(new UserData());
			}
		},
		// TODO - this method feels out of place. Put it with the other comp that uses firestore?
		async addUserDataToStore(): Promise<void> {
			const uid = this.store.getState().user.uid;
			const userData = await readUserDataById(uid);
			if (userData.days && userData.days.length > 0) {
				this.store.setUserData(userData);
				this.store.setConvenienceData(
					this.store.parseConvenienceData(userData)
				);
			} else {
				this.handleNewUser();
			}
		},

		async write(): Promise<void> {
			if (this.testMode) {
				const uid = this.store.getState().user.uid;
				const userData = this.store.getState().userData;
				await writeUserData(uid, userData);
			}
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
