import { inject, reactive } from 'vue';
import { cloneDeep } from "lodash"

export const storeSymbol = Symbol('state');

export const createStore = () => {
	const state = reactive({
        user: null,
        userData: null
	});
	const setUser = function(newUser) {
		state.user = newUser;
    };
    const setUserData = function(newUserData) {
		state.userData = newUserData;
	};
	const getState = () => {
		return cloneDeep(state);
	};

	return { setUser, setUserData, getState };
};

export const useStore = () => inject(storeSymbol);
