<template>
	<section>
		<div v-if="!regDone">
			<h1>Welcome, {{ name }}</h1>
			<p>
				Let's get you started with tracking 3 <u>body weight</u> exercises.
				Enter the names of the 3 exercises you'd like to track below.
			</p>
			<label class="label">Exercise 1 Name: </label>
			<input
				type="text"
				v-model="daysList[0].exercise"
				:class="errNmTup[0] ? 'err' : ''"
				@input="validateRow('NAME', 0)"
			/>
			<br />
			<label class="label">Exercise 2 Name: </label>
			<input
				type="text"
				v-model="daysList[1].exercise"
				:class="errNmTup[1] ? 'err' : ''"
				@input="validateRow('NAME', 1)"
			/>
			<br />
			<label class="label">Exercise 3 Name: </label>
			<input
				type="text"
				v-model="daysList[2].exercise"
				:class="errNmTup[2] ? 'err' : ''"
				@input="validateRow('NAME', 2)"
			/>
			<br />
			<p>
				What's your best guess on how many reps of each exercise you could
				complete in 1 set?
			</p>
			<label class="label">
				{{ daysList[0].exercise ? daysList[0].exercise : 'Exercise 1' }} Reps:
			</label>
			<input
				type="number"
				v-model="repsTuple[0]"
				:class="errRpTup[0] ? 'err' : ''"
				@input="validateRow('REP', 0)"
			/>
			<br />
			<label class="label">
				{{ daysList[1].exercise ? daysList[1].exercise : 'Exercise 2' }} Reps:
			</label>
			<input
				type="number"
				v-model="repsTuple[1]"
				:class="errRpTup[1] ? 'err' : ''"
				@input="validateRow('REP', 1)"
			/>
			<br />
			<label class="label">
				{{ daysList[2].exercise ? daysList[2].exercise : 'Exercise 3' }} Reps:
			</label>
			<input
				type="number"
				v-model="repsTuple[2]"
				:class="errRpTup[2] ? 'err' : ''"
				@input="validateRow('REP', 2)"
			/>
			<br />
			<button @click="validateAndWrite">Next</button>
			<div v-if="error">{{ error }}</div>
		</div>
		<how-to v-else />
	</section>
</template>

<script lang="ts">
import { useStore, Day } from '../store';
import { writeUserData } from '../services/FirebaseService';
import { urlifyStr } from '../utils/StringUtils';
import HowTo from '../components/HowTo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Register',
	setup() {
		return { store: useStore() };
	},
	components: {
		HowTo
	},
	data() {
		return {
			name: '',
			repsTuple: Array<string>(),
			daysList: [new Day(), new Day(), new Day()],
			today: new Date().toJSON().slice(0, 10),
			error: '',
			errNmTup: [0, 0, 0],
			errRpTup: [0, 0, 0],
			regDone: false
		};
	},
	beforeMount() {
		this.name = this.store.getState().user.name;
	},
	methods: {
		validateAndWrite(): void {
			try {
				this.validate(false);
				this.write();
				this.regDone = true;
			} catch (e) {
				this.error = e;
			}
		},
		validateRow(type: string, idx: number) {
			if ('NAME' == type) {
				const namePattern = new RegExp(/^\w[\w\s]*$/);
				this.errNmTup[idx] = 0;
				if (
					!this.daysList[idx].exercise ||
					!namePattern.test(this.daysList[idx].exercise)
				) {
					this.errNmTup[idx] = 1;
				}
			}

			if ('REP' == type) {
				const numPattern = new RegExp(/^\d+$/);
				this.errRpTup[idx] = 0;
				if (!this.repsTuple[idx] || !numPattern.test(this.repsTuple[idx])) {
					this.errRpTup[idx] = 1;
				}
			}
		},
		validate(silent: boolean): void {
			this.error = '';
			this.errNmTup = [0, 0, 0];
			this.errRpTup = [0, 0, 0];
			const namePattern = new RegExp(/^\w[\w\s]*$/);
			const numPattern = new RegExp(/^\d+$/);
			const nameSet = new Set<string>();
			let errArr = new Array<string>();

			for (let idx in this.daysList) {
				let nextDay = this.daysList[idx];
				nextDay.date = idx;

				if (!nextDay.exercise || !namePattern.test(nextDay.exercise)) {
					errArr.push('BAD_NAME:' + idx);
					this.errNmTup[idx] = 1;
				}

				if (nameSet.has(nextDay.exercise)) {
					errArr.push('DUP_NAME:' + idx);
					this.errNmTup[idx] = 1;
				} else nameSet.add(nextDay.exercise);

				if (!this.repsTuple[idx] || !numPattern.test(this.repsTuple[idx])) {
					errArr.push('BAD_REP:' + idx);
					this.errRpTup[idx] = 1;
				} else nextDay.sets[0] = Number.parseInt(this.repsTuple[idx]);
			}
			if (errArr.length > 0 && !silent) throw errArr;
		},
		write(): void {
			let currentData = this.store.getState().userData;
			const uid = this.store.getState().user.uid;

			if (!currentData || !uid) {
				throw 'BAD_STATE';
			}

			if (currentData.days.length !== 0) {
				throw 'DUP_USER';
			}

			for (let nextDay of this.daysList) {
				nextDay.exercise = urlifyStr(nextDay.exercise);
			}

			currentData.days = this.daysList;
			this.store.setUserData(currentData);
			this.store.setConvenienceData(
				this.store.parseConvenienceData(currentData)
			);
			writeUserData(uid, currentData);
		}
	}
});
</script>

<style scoped>
.err {
	color: red;
	background-color: pink;
}
.label {
	display: inline-block;
	width: 9%;
}
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
</style>
