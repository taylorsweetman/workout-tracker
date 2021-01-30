import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';
import ExerciseSession from '../views/ExerciseSession.vue';
import Register from '../views/Register.vue';

const routes = [
	{
		path: '/',
		name: 'Root',
		component: Home
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/history',
		name: 'History',
		component: History
	},
	{
		path: '/exercise/:appName',
		name: 'ExerciseSession',
		component: ExerciseSession,
		props: true
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
