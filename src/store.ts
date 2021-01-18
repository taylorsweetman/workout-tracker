import { inject, reactive } from 'vue';
import { cloneDeep } from 'lodash';

export class AppUser {
	uid: string;
	constructor(uid?: string) {
		if (uid) this.uid = uid;
		else this.uid = '';
	}
	isReady() {
		return this.uid ? true : false;
	}
}

interface State {
	user: AppUser;
	userData: UserData;
}

export class Day {
	date: string;
	exercise: string;
	sets: Array<number>;
	constructor(date?: string, exercise?: string, sets?: Array<number>) {
		date ? (this.date = date) : (this.date = '');
		exercise ? (this.exercise = exercise) : (this.exercise = '');
		sets ? (this.sets = sets) : (this.sets = []);
	}
}

export class UserData {
	days: Array<Day>;
	constructor(daysArr?: Array<Day>) {
		if (daysArr) {
			this.days = daysArr;
		} else {
			this.days = [];
		}
	}
	isReady(): boolean {
		if (this.days[0] && this.days[0].date != '') return true;
		else return false;
	}
}

interface StoreInstance {
	setUser(arg0: AppUser): void;
	setUserData(arg0: UserData): void;
	getState(): State;
}

export const storeSymbol: Symbol = Symbol('state');

export const createStore = (): StoreInstance => {
	const state: State = reactive({
		user: new AppUser(),
		userData: new UserData()
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

export const useStore = (): StoreInstance => {
	return inject(storeSymbol, createStore());
};
