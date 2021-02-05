<template>
	<div v-if="!loggedIn && !error" class="box" @click="newUser">
		Register / Login
	</div>
	<div v-else-if="loggedIn && !error" class="box" @click="localLogout">
		Log Out
	</div>
	<div v-else class="box">Error Message: {{ error }}</div>
</template>

<script lang="ts">
import { useStore, AppUser, UserData } from '../store';
import { performAuth, logout } from '../services/FirebaseService';
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
		async newUser(): Promise<void> {
			const appUser = await performAuth();

			this.store.setUser(appUser);
			this.loggedIn = true;
			this.$emit('new-user');
		},
		async localLogout(): Promise<void> {
			await logout();
			this.store.setUser(new AppUser());
			this.store.setUserData(new UserData());
			this.store.setConvenienceData(new UserData());
			this.loggedIn = false;
			this.$router.push('/');
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
