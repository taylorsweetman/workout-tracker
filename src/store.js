import { inject, reactive, readonly } from 'vue';

export const storeSymbol = Symbol('store');

export const createStore = () => {
	const state = reactive({
        user: {},
        userData: {}
	});
	const setUser = function(newUser) {
		state.user = newUser;
    };
    const setUserData = function(newUserData) {
		state.userData = newUserData;
	};

	return { setUser, setUserData, store: readonly(state) };
};

export const useStore = () => inject(storeSymbol);
