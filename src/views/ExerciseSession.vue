<template>
	<section>
		<h1>Total Reps Completed: {{ totalReps }}</h1>
		<Set
			v-for="(set, idx) in todayData.sets"
			:key="idx"
			:exercise-name="appSession.displayName"
			:set-num="idx + 1"
			:prompt-reps="set"
			@set-done="setDone"
			@set-undone="setUndone"
		/>
		<br />
		<br />
		<button @click="finished">
			<h1>Done!</h1>
		</button>
	</section>
</template>

<script lang="ts">
import Set from '../components/Set.vue';
import { useStore, Day } from '../store';
import { beautifyStr } from '../utils/StringUtils';
import { writeUserData } from '../services/FirebaseService';
import { defineComponent } from 'vue';

export class AppSession {
	displayName: string;
	appName: string;
	lastDate: string;

	constructor(appName: string, lastDate?: string) {
		this.appName = appName;
		this.displayName = beautifyStr(appName);
		this.lastDate = lastDate ? lastDate : '';
	}

	setLastDate(lastDate: string): void {
		this.lastDate = lastDate;
	}
}

export default defineComponent({
	name: 'ExerciseSession',
	components: {
		Set
	},
	props: {
		appName: {
			type: String,
			required: true
		}
	},
	setup() {
		return { store: useStore() };
	},
	data() {
		return {
			repsTuple: [0, 0, 0],
			todayData: new Day(),
			appSession: new AppSession(this.appName)
		};
	},
	beforeMount() {
		this.runDataCalcs();
	},
	computed: {
		totalReps(): number {
			let total = 0;
			for (let reps of this.repsTuple) {
				total += reps;
			}
			return total;
		}
	},
	methods: {
		runDataCalcs(): void {
			const lastDayData = this.findLastDataPt();
			const lastDayReps = this.getTotalRepsFromDay(lastDayData);
			const newRepsTuple = this.findSetReps(lastDayReps);
			this.prepData(newRepsTuple);
		},
		findLastDataPt(): Day {
			const data = this.store.getState().userData;

			if (!data.days) {
				return new Day();
			}

			for (var i = data.days.length - 1; i >= 0; i--) {
				const nextDayData = data.days[i];
				const exercise = nextDayData.exercise;

				if (exercise === this.appSession.appName) {
					this.appSession.setLastDate(nextDayData.date);
					return nextDayData;
				}
			}

			return new Day();
		},
		getTotalRepsFromDay(lastDayData: Day): number {
			var totalReps = 0;
			if (lastDayData) {
				for (const nextReps of lastDayData.sets) {
					totalReps += nextReps;
				}
			}
			return totalReps;
		},
		findSetReps(lastDayReps: number): Array<number> {
			const goalTotal = lastDayReps + 1;
			const div = Math.floor(goalTotal / 3);
			let rem = goalTotal % 3;

			let tuple = [div, div, div];

			for (var i = 0; rem > 0; rem--) {
				tuple[i] = tuple[i] + 1;
				i++;
			}

			return tuple;
		},
		prepData(newRepsTuple: Array<number>): void {
			const today = new Date().toJSON().slice(0, 10);
			this.todayData = new Day(
				today,
				this.appSession.appName,
				newRepsTuple
			);
		},
		setDone(completedReps: number, setNum: number): void {
			this.repsTuple[setNum - 1] = completedReps;
		},
		setUndone(setNum: number): void {
			this.repsTuple[setNum - 1] = 0;
		},
		prepTodaySets(): void {
			for (let i = 0; i < 3; i++) {
				this.todayData.sets[i] = this.repsTuple[i];
			}
		},
		finished(): void {
			this.prepTodaySets();
			const storeCopy = this.store.getState().userData;
			storeCopy.days.push(this.todayData);
			this.store.setUserData(storeCopy);
			this.store.setConvenienceData(this.store.parseConvenienceData(storeCopy));
			this.updateFirebaseData();
			this.$router.push('/history');
		},
		async updateFirebaseData(): Promise<void> {
			const uid = this.store.getState().user.uid;
			const toWrite = this.store.getState().userData;
			await writeUserData(uid, toWrite);
		}
	}
});
</script>

<style scoped>
button {
	margin: 1%;

	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	margin: 1rem;
	margin-bottom: 0%;
	border-radius: 10px;
	padding: 1rem;
	background-color: #f05454;
	color: white;
	text-align: center;
}
h1 {
	color: black;
}
button h1 {
	color: white;
}

h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
