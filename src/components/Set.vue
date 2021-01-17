<template>
	<div class="comp">
		<button @click="toggleDone" :class="finished ? 'finished' : ''">
			<h1>{{ exerciseName }}</h1>
			<h1>Reps: {{ doneReps }}</h1>
		</button>
		<div class="button-pack">
			<button class="adjust" @click="repDown">
				-
			</button>
			<button class="adjust" @click="repUp">
				+
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Set',
	props: {
		exerciseName: { type: String, default: '' },
		setNum: { type: Number, default: -1 },
		promptReps: { type: Number, default: -1 }
	},
	emits: ['set-done', 'set-undone'],
	data() {
		return {
			finished: false,
			doneReps: this.promptReps
		};
	},
	methods: {
		emitRepChange(): void {
			this.$emit('set-done', this.doneReps, this.setNum);
		},
		toggleDone(): void {
			this.finished = !this.finished;
			if (this.finished) {
				this.emitRepChange();
			} else {
				this.$emit('set-undone', this.setNum);
			}
		},
		repUp(): void {
			this.doneReps++;
			if (this.finished) this.emitRepChange();
		},
		repDown(): void {
			if (this.doneReps > 0) this.doneReps--;
			if (this.finished) this.emitRepChange();
		}
	}
});
</script>

<style scoped>
.comp {
	display: inline-block;
}
.button-pack {
	display: block;
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
.adjust {
	vertical-align: middle;
	width: 4rem;
	margin: 0%;
	background-color: #30475e;
}
.finished {
	background-color: #42b983;
}
h1 {
	color: white;
}
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
a {
	color: #42b983;
}
</style>
