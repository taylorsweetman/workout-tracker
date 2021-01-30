<template>
	<section>
		<h1>Hello, {{ userName }}!</h1>
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
            userName: ''
        };
    },
    beforeMount() {
        this.userName = this.store.getState().user.name;
    }
});
</script>
