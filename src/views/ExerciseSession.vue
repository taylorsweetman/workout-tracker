<template>
	<section>
		<h1>Total Reps Completed: {{ totalReps }}</h1>
		<Set
			v-for="(set, idx) in todayData.sets"
			:key="idx"
			:exercise-name="beautifyStr(todayData.exercise)"
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
import firebase from 'firebase/app';
import 'firebase/firestore';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ExerciseSession',
	components: {
		Set
	},
	props: {
		localName: {
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
			beautifyStr: beautifyStr
		};
	},
	beforeMount() {
		this.runDataCalcs();
	},
	computed: {
		totalReps() {
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

				if (exercise === this.localName) {
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
			this.todayData = new Day(today, this.localName, newRepsTuple);
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
			this.updateFirebaseData();
			this.$router.push('/history');
		},
		updateFirebaseData(): void {
			const uid = this.store.getState().user.uid;

			// need vanilla obj for firebase
			const objToWrite = { ...this.store.getState().userData };
			if (!uid || !objToWrite) {
				console.error("Can't update Firebase.", uid, objToWrite);
				return;
			}

			// need vanilla obj [] for firebase
			const daysArr = objToWrite.days.map((nextDay) => {
				return { ...nextDay };
			});
			objToWrite.days = daysArr;

			var db = firebase.firestore();
			db.collection('histories')
				.doc(uid)
				.set(objToWrite)
				.then(function() {
					console.log('Document successfully written!');
				})
				.catch(function(error) {
					console.error('Error writing document: ', error);
				});
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
