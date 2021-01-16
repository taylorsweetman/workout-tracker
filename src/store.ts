import { inject, reactive } from 'vue';
import { cloneDeep } from "lodash"

export class AppUser {
	uid: string;
	constructor(uid: string) {
		this.uid = uid;
	}
}

interface State {
	user: AppUser | null,
	userData: UserData | null,
}

interface Day {
	date: string,
	exercise: string,
	sets: Array<number>
}

interface UserData {
	days: Array<Day>
}

interface StoreInstance {
	setUser(arg0: AppUser | null): void,
	setUserData(arg0: UserData | null): void, 
	getState(): State
}

export const storeSymbol: Symbol = Symbol('state');

export const createStore = (): StoreInstance => {
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

export const useStore = (): StoreInstance | undefined => inject(storeSymbol);
