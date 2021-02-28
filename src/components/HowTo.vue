<template>
	<section>
		<h1>How's this work?</h1>
		<p>Lorem ipsum dolor sit amet.</p>
		<button @click="takeHome">I'm ready!</button>
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
