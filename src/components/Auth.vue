<template>
	<div v-if="!loggedIn && !error" class="box" @click="performAuth">
		Register / Login
	</div>
	<div v-else-if="loggedIn && !error" class="box" @click="logout">
		Log Out
	</div>
	<div v-else class="box">Error Message: {{ error }}</div>
</template>

<script lang="ts">
import { useStore, AppUser, UserData } from '../store';
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return { store: useStore() };
	},
	emits: ['new-user'],
	data() {
		return {
			error: '',
			loggedIn: false
		};
	},
	methods: {
		performAuth(): void {
			var that = this;
			var provider = new firebase.auth.GoogleAuthProvider();

			firebase
				.auth()
				.signInWithPopup(provider)
				.then((result) => {
					const incomingUser = result.user;
					if (incomingUser) {
						const fullName = incomingUser.displayName
							? incomingUser.displayName
							: '';
						const name = that.parseFullForFirst(fullName);
						const appUser = new AppUser(incomingUser.uid, name);
						that.store.setUser(appUser);
						that.loggedIn = true;
						that.$emit('new-user');
					}
				})
				.catch((error) => {
					that.error = error.message;
				});
		},
		logout(): void {
			var that = this;
			firebase
				.auth()
				.signOut()
				.then(() => {
					if (that.store) {
						that.store.setUser(new AppUser());
						that.store.setUserData(new UserData());
						that.store.setConvenienceData(new UserData());
					}
					that.loggedIn = false;
				})
				.catch((error) => {
					that.error = error.message;
				});
		},
		parseFullForFirst(fullName: string): string {
			const re = new RegExp(/^(\w+)/);
			const matchArr = fullName.match(re);
			const groupMatch =
				matchArr && matchArr.length > 1 ? matchArr[1] : 'New User';
			return groupMatch;
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
