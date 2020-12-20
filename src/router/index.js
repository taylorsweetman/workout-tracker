import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';
import ExerciseSession from '../views/ExerciseSession.vue';

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/history',
		name: History,
		component: History
	},
	{
		path: '/exercise/:localName',
		name: ExerciseSession,
		component: ExerciseSession,
		props: true
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
