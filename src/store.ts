import { inject, reactive } from 'vue';
import { cloneDeep } from "lodash"

export const storeSymbol = Symbol('state');

export const createStore = () => {
	const state = reactive({
        user: null,
        userData: null
	});
	const setUser = function(newUser) {
		const newData = cloneDeep(newUser);
		state.user = newData;
    };
    const setUserData = function(newUserData) {
		const newData = cloneDeep(newUserData);
		state.userData = newData;
	};
	const getState = () => {
		return cloneDeep(state);
	};

	return { setUser, setUserData, getState };
};

export const useStore = () => inject(storeSymbol);
