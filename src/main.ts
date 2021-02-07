import { createApp } from 'vue';
import { storeSymbol, createStore } from './store';
import App from './App.vue';
import router from './router';

createApp(App)
	.use(router)
	.provide(storeSymbol, createStore())
	.mount('#app');
