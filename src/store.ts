import { inject, reactive } from 'vue';
import { cloneDeep } from "lodash"

interface AppUser {
	uid: string
}

interface State {
	user: AppUser | null,
	userData: UserData | null
}

interface Day {
	date: string,
	exercise: string,
	sets: Array<number>
}

interface UserData {
	days: Array<Day>
}

export const storeSymbol = Symbol('state');

export const createStore = () => {
	const state: State = reactive({
        user: null,
        userData: null
	});

	const setUser = function(newUser: AppUser) {
		const newData = cloneDeep(newUser);
		state.user = newData;
    };
    const setUserData = function(newUserData: UserData) {
		const newData = cloneDeep(newUserData);
		state.userData = newData;
	};
	const getState = (): State => {
		return cloneDeep(state);
	};

	return { setUser, setUserData, getState };
};

export const useStore = () => inject(storeSymbol);
