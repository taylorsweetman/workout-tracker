import { createApp } from 'vue';
import { storeSymbol, createStore } from './store';
import App from './App.vue';
import firebase from 'firebase/app';
import router from './router';

const configOptions = {
	apiKey: 'AIzaSyA7a901k5rFaSoJGnRXaa7IbuJruQVh_pM',
	authDomain: 'workout-app-e5db1.firebaseapp.com',
	projectId: 'workout-app-e5db1',
	storageBucket: 'workout-app-e5db1.appspot.com',
	messagingSenderId: '823373219552',
	appId: '1:823373219552:web:1eb03d3ed1637c8c50f285',
	measurementId: 'G-NT28P3L0PV'
};

firebase.initializeApp(configOptions);

createApp(App)
	.use(router)
	.provide(storeSymbol, createStore())
	.mount('#app');
