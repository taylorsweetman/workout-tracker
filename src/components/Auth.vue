<template>
	<div v-if="!store.getState().user.uid" class="box" @click="performAuth">
		Register / Login
	</div>
	<div v-else class="box" @click="logout">
		Log Out
	</div>
</template>

<script lang="ts">
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useStore, AppUser, UserData } from '../store';
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return { store: useStore() };
	},
	emits: ['new-user'],
	data() {
		return {
			error: ''
		};
	},
	methods: {
		performAuth() {
			var that = this;
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase
				.auth()
				.signInWithPopup(provider)
				.then((result) => {
					if (result.user && that.store) {
						var user = new AppUser(result.user.uid);
						that.store.setUser(user);
						that.$emit('new-user');
					}
				})
				.catch((error) => {
					that.error = error.message;
				});
		},
		logout() {
			var that = this;
			firebase
				.auth()
				.signOut()
				.then(() => {
					if (that.store) {
						that.store.setUser(new AppUser());
						that.store.setUserData(new UserData());
					}
				})
				.catch((error) => {
					that.error = error.message;
				});
		}
	}
});
</script>

<style scoped>
.box {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	border-radius: 10px;
	padding: 1rem;
	background-color: #f05454;
	color: white;
}
</style>
