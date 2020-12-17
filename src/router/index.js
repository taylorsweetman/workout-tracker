import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';
import ExerciseSession from '../views/ExerciseSession.vue';

const routes = [
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
	/* {
		path: '/about',
		name: 'About',
		 route level code-splitting
		 this generates a separate chunk (about.[hash].js) for this route
		 which is lazy-loaded when the route is visited.
		component: () =>
			import( webpackChunkName: "about"  '../views/About.vue')
	} */
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
