<template>
	<section>
		<h1>Welcome, {{ name }}</h1>
		<p>
			Let's get you started with tracking 3 exercises. Enter the names of the 3
			exercises you'd like to track below.
		</p>
		<p>Exercise 1 Name:</p>
		<input type="text" v-model="daysList[0].exercise" />
		<p>Exercise 2 Name:</p>
		<input type="text" v-model="daysList[1].exercise" />
		<p>Exercise 3 Name:</p>
		<input type="text" v-model="daysList[2].exercise" />
		<p>
			What's your best guess on how many reps of each exercise you could
			complete in 1 set?
		</p>
		<p>
			Best Guess on 1 set max reps ->
			{{ daysList[0].exercise ? daysList[0].exercise : 'Exercise 1: ' }}
			<input type="number" v-model="repsTuple[0]" />
		</p>
		<p>
			Best Guess on 1 set max reps ->
			{{ daysList[1].exercise ? daysList[1].exercise : 'Exercise 2: ' }}
			<input type="number" v-model="repsTuple[1]" />
		</p>
		<p>
			Best Guess on 1 set max reps ->
			{{ daysList[2].exercise ? daysList[2].exercise : 'Exercise 3: ' }}
			<input type="number" v-model="repsTuple[2]" />
		</p>
		<button @click="validateAndWrite">Submit</button>
		<div v-if="error">{{ error }}</div>
	</section>
</template>

<script lang="ts">
import { useStore, Day } from '../store';
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
			error: ''
		};
	},
	beforeMount() {
		this.name = this.store.getState().user.name;
	},
	methods: {
		validateAndWrite(): void {
			try {
				this.validate();
			} catch (e) {
				this.error = e;
				return;
			}
			this.write();
		},
		validate(): void {
			let namePattern = new RegExp(/^[\s\w]+$/);
			let numPattern = new RegExp(/^\d+$/);
			let nameSet = new Set<string>();

			for (let idx in this.daysList) {
				let nextDay = this.daysList[idx];
				nextDay.date = idx;

				if (!nextDay.exercise || !namePattern.test(nextDay.exercise)) {
					throw 'BAD_NAME:' + idx;
				}

				if (nameSet.has(nextDay.exercise)) {
					throw 'DUP_NAME:' + idx;
				} else {
					nameSet.add(nextDay.exercise)
				}

				if (!this.repsTuple[idx] || !numPattern.test(this.repsTuple[idx])) {
					throw 'BAD_REP:' + idx;
				}

				nextDay.sets[0] = Number.parseInt(this.repsTuple[idx]);
			}
		},
		write(): void {
			let currentData = this.store.getState().userData;
			currentData.days = this.daysList;
			this.store.setUserData(currentData);
		}
	}
});
</script>
