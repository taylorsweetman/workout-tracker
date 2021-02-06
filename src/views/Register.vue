<template>
	<section>
		<h1>Welcome, {{ name }}</h1>
		<p>
			Let's get you started with tracking 3 exercises. Enter the names of the 3
			exercises you'd like to track below.
		</p>
		<p>Exercise 1 Name:</p>
		<input
			type="text"
			v-model="daysList[0].exercise"
			:class="errNmTup[0] ? 'err' : ''"
			@input="validateRow('NAME', 0)"
		/>
		<p>Exercise 2 Name:</p>
		<input
			type="text"
			v-model="daysList[1].exercise"
			:class="errNmTup[1] ? 'err' : ''"
			@input="validateRow('NAME', 1)"
		/>
		<p>Exercise 3 Name:</p>
		<input
			type="text"
			v-model="daysList[2].exercise"
			:class="errNmTup[2] ? 'err' : ''"
			@input="validateRow('NAME', 2)"
		/>
		<p>
			What's your best guess on how many reps of each exercise you could
			complete in 1 set?
		</p>
		<p>
			Best Guess on 1 set max reps ->
			{{ daysList[0].exercise ? daysList[0].exercise : 'Exercise 1: ' }}
			<input
				type="number"
				v-model="repsTuple[0]"
				:class="errRpTup[0] ? 'err' : ''"
				@input="validateRow('REP', 0)"
			/>
		</p>
		<p>
			Best Guess on 1 set max reps ->
			{{ daysList[1].exercise ? daysList[1].exercise : 'Exercise 2: ' }}
			<input
				type="number"
				v-model="repsTuple[1]"
				:class="errRpTup[1] ? 'err' : ''"
				@input="validateRow('REP', 1)"
			/>
		</p>
		<p>
			Best Guess on 1 set max reps ->
			{{ daysList[2].exercise ? daysList[2].exercise : 'Exercise 3: ' }}
			<input
				type="number"
				v-model="repsTuple[2]"
				:class="errRpTup[2] ? 'err' : ''"
				@input="validateRow('REP', 2)"
			/>
		</p>
		<button @click="validateAndWrite">Submit</button>
		<div v-if="error">{{ error }}</div>
	</section>
</template>

<script lang="ts">
import { useStore, Day } from '../store';
import { writeUserData } from '../services/FirebaseService';
import { urlifyStr } from '../utils/StringUtils';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Register',
	setup() {
		return { store: useStore() };
	},
	data() {
		return {
			name: '',
			repsTuple: Array<string>(),
			daysList: [new Day(), new Day(), new Day()],
			today: new Date().toJSON().slice(0, 10),
			error: '',
			errNmTup: [0, 0, 0],
			errRpTup: [0, 0, 0]
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
				this.$router.push('/');
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
</style>
