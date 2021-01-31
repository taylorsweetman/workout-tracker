<template>
	<section>
		<h1>Welcome, {{ name }}</h1>
		<p>Exercise 1 Name:</p>
		<p>Exercise 2 Name:</p>
		<p>Exercise 3 Name:</p>
		<p>Best Guess on 1 set max reps -> Exercise 1:</p>
		<p>Best Guess on 1 set max reps -> Exercise 2:</p>
		<p>Best Guess on 1 set max reps -> Exercise 3:</p>
	</section>
</template>

<script lang="ts">
import { useStore } from '../store';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Register',
	setup() {
		return { store: useStore() };
	},
	data() {
		return {
			name: ''
		};
	},
	beforeMount() {
		this.name = this.store.getState().user.name;
	}
});
</script>
