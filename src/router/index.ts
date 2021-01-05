import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home';
import History from '../views/History';
import ExerciseSession from '../views/ExerciseSession';

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
		path: '/exercise/:localName',
		name: 'ExerciseSession',
		component: ExerciseSession,
		props: true
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
