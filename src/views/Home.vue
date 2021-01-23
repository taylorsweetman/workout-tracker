<template>
	<div>
		<div class="row" v-if="showExercises()">
			<router-link to="/exercise/push_ups" class="box">Push Ups</router-link>
			<router-link to="/exercise/pull_ups" class="box">Pull Ups</router-link>
			<router-link to="/exercise/squats" class="box">Squats</router-link>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import { useStore, UserData } from '../store';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Home',
	setup() {
		return { store: useStore() };
	},
	methods: {
		showExercises(): boolean {
			let userData = new UserData(this.store.getState().userData.days);
			return userData.days.length !== 0;
		}
	}
});
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
