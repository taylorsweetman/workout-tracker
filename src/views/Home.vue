<template>
	<div>
		<div class="row" v-if="showExercises">
			<router-link
				:to="{
					name: 'ExerciseSession',
					params: { appName: displayData[0].appName }
				}"
				class="box"
			>
				{{ displayData[0].displayName }}<br /><br />
				Last Workout: {{ displayData[0].lastDate }}
			</router-link>
			<router-link
				:to="{
					name: 'ExerciseSession',
					params: { appName: displayData[1].appName }
				}"
				class="box"
			>
				{{ displayData[1].displayName }}<br /><br />
				Last Workout: {{ displayData[1].lastDate }}
			</router-link>
			<router-link
				:to="{
					name: 'ExerciseSession',
					params: { appName: displayData[2].appName }
				}"
				class="box"
			>
				{{ displayData[2].displayName }}<br /><br />
				Last Workout: {{ displayData[2].lastDate }}
			</router-link>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import { useStore, UserData } from '../store';
import { defineComponent } from 'vue';
import { AppSession } from '../views/ExerciseSession.vue'

export default defineComponent({
	name: 'Home',
	setup() {
		return { store: useStore() };
	},
	data() {
		return {
			displayData: Array<AppSession>()
		};
	},
	computed: {
		showExercises(): boolean {
			let userData = new UserData(this.store.getState().userData.days);
			if (userData.days.length !== 0) {
				this.updateDisplayData();
				return true;
			} else return false;
		}
	},
	methods: {
		updateDisplayData(): void {
			this.displayData = new Array<AppSession>();
			const convData = this.store.getState().convenienceData;
			const pattern = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}');
			for (let i = 0; i < convData.days.length; i++) {
				let { exercise, date } = convData.days[i];
				date = pattern.test(date) ? date : 'No workout yet!';
				const nextAS = new AppSession(exercise, date);
				this.displayData.unshift(nextAS);
			}
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
