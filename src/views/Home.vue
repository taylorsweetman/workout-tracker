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
				Last Workout:<br />
				{{ displayData[0].lastDate }}
			</router-link>
			<router-link
				:to="{
					name: 'ExerciseSession',
					params: { appName: displayData[1].appName }
				}"
				class="box"
			>
				{{ displayData[1].displayName }}<br /><br />
				Last Workout:<br />
				{{ displayData[1].lastDate }}
			</router-link>
			<router-link
				:to="{
					name: 'ExerciseSession',
					params: { appName: displayData[2].appName }
				}"
				class="box"
			>
				{{ displayData[2].displayName }}<br /><br />
				Last Workout:<br />
				{{ displayData[2].lastDate }}
			</router-link>
		</div>
		<router-view />
	</div>
</template>

<script lang="ts">
import { useStore, UserData } from '../store';
import { defineComponent } from 'vue';
import { ExerciseSession } from '../views/ExerciseSession.vue';

export default defineComponent({
	name: 'Home',
	setup() {
		return { store: useStore() };
	},
	data() {
		return {
			displayData: Array<ExerciseSession>()
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
			this.displayData = new Array<ExerciseSession>();
			const convData = this.store.getState().convenienceData;
			const pattern = new RegExp(/^\d{4}-\d\d-\d\d$/);
			for (let i = 0; i < convData.days.length; i++) {
				let { exercise, date } = convData.days[i];
				date = pattern.test(date) ? date : 'No workout yet!';
				const nextAS = new ExerciseSession(exercise, date);
				this.displayData.unshift(nextAS);
			}
		}
	}
});
</script>