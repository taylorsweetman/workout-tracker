<template>
	<button @click="writeData">
		write mock data
	</button>
</template>

<script lang="ts">
import { useStore, AppUser } from '../store';
import dataObj from '../mock_data';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {
			store: useStore()
		};
	},
	methods: {
		writeData(): void {
			this.updateFirebaseData();
		},
		updateFirebaseData(): void {
			let user = new AppUser();
			if (this.store.getState().user.uid && dataObj) {
				user.uid = this.store.getState().user.uid;
			} else {
				return;
			}

			var db = firebase.firestore();
			db.collection('histories')
				.doc(user.uid)
				.set(dataObj)
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
