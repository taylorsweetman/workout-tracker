<template>
	<section>
		<h1>How's This Work?</h1>
		<br />
		<p>
			The goal of Easy Workout App is to push you to get stronger in your 3
			chosen body weight exercises. We use the concept of
			<a href="https://en.wikipedia.org/wiki/Progressive_overload"
				>progressive overload</a
			>
			to ensure each workout is a little harder than the last.
		</p>
		<br />
		<p>
			For the 1st and 2nd sets, do the amount of reps suggested by the app. On
			the last set, do as many reps as you can. Think of the suggested reps on
			this set as a minimum.
		</p>
		<br />
		<p>
			Once you have completed the workout, the app will store your results and
			push you just a little harder on the next workout. Good luck!
		</p>
		<br />
		<button @click="takeHome">I'm Ready!</button>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HowTo',
	methods: {
		takeHome(): void {
			this.$router.push('/home');
		}
	}
});
</script>

<style scoped>
p {
	width: 50%;
	display: inline-block;
}
</style>
