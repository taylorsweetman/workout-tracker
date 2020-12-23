import { inject, reactive, readonly } from 'vue';

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

	return { setUser, setUserData, state: readonly(state) };
};

export const useStore = () => inject(storeSymbol);
