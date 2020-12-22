import { inject, reactive, readonly } from 'vue';

export const storeSymbol = Symbol('state');

export const createStore = () => {
	const state = reactive({ counter: 0 });
	const increment = () => state.counter++;

	return { increment, state: readonly(state) };
};

export const useStore = () => inject(storeSymbol);
