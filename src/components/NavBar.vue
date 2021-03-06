<template>
	<div>
		<div class="topnav">
			<h1>{{ titleName }} Workout App</h1>
			<router-link v-show="showHome" to="/home" class="box">Home</router-link>
			<router-link v-show="showHistory" to="/history" class="box">
				History
			</router-link>
			<auth v-show="showAuth" class="box" @new-user="newUser" />
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import Auth from './Auth.vue';
import { useStore, UserData } from '../store';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'NavBar',
	components: { Auth },
	emits: ['new-user'],
	setup() {
		return { store: useStore() };
	},
	computed: {
		showHome(): boolean {
			return (
				this.currentRouteName() !== 'Home' &&
				this.currentRouteName() !== 'Root' &&
				this.currentRouteName() !== 'Register'
			);
		},
		showHistory(): boolean {
			const userData = new UserData(this.store.getState().userData.days);
			return (
				userData.days.length !== 0 &&
				this.currentRouteName() !== 'History' &&
				this.currentRouteName() !== 'Register'
			);
		},
		showAuth(): boolean {
			return this.currentRouteName() !== 'Register';
		},
		titleName(): string {
			const currentState = this.store.getState();
			return currentState.user.name ? currentState.user.name + "'s" : 'Easy';
		}
	},
	methods: {
		currentRouteName(): string | symbol {
			if (this.$route.name) {
				return this.$route.name;
			} else {
				return '';
			}
		},
		newUser(): void {
			this.$emit('new-user');
		}
	}
});
</script>

<style scoped>
h1 {
	color: white;
}

.topnav {
	background-color: #30475e;
	overflow: hidden;
	border-radius: 10px;
}

/* Style the links inside the navigation bar */
.topnav .box {
	padding: 14px 16px;
	font-size: 17px;
}

/* Change the color of links on hover */
.topnav .box:hover {
	background-color: #ddd;
	color: black;
	cursor: pointer;
}
</style>
