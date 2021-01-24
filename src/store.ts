import { inject, reactive } from 'vue';
import { cloneDeep } from 'lodash';

export class AppUser {
	uid: string;
	constructor(uid?: string) {
		if (uid) this.uid = uid;
		else this.uid = '';
	}
}

interface State {
	user: AppUser;
	userData: UserData;
	convenienceData: UserData;
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
			this.days = Array<Day>();
		}
	}
}

interface StoreInstance {
	setUser(arg0: AppUser): void;
	setUserData(arg0: UserData): void;
	setConvenienceData(arg0: UserData): void;
	parseConvenienceData(arg0: UserData): UserData;
	getState(): State;
}

export const storeSymbol: Symbol = Symbol('state');

export const createStore = (): StoreInstance => {
	const state: State = reactive({
		user: new AppUser(),
		userData: new UserData(),
		convenienceData: new UserData()
	});
	const setUser = (newUser: AppUser) => {
		const newData = cloneDeep(newUser);
		state.user = newData;
	};
	const setUserData = (newUserData: UserData) => {
		const newData = cloneDeep(newUserData);
		state.userData = newData;
	};
	const setConvenienceData = (convenienceData: UserData) => {
		const newData = cloneDeep(convenienceData);
		state.convenienceData = newData;
	};
	const getState = (): State => {
		return cloneDeep(state);
	};

	const parseConvenienceData = (fullUserData: UserData): UserData => {
		let result = new UserData();
		let insertedExercises = new Set<string>();
		let count = 0;
		for (let i = fullUserData.days.length - 1; i > -1; i--) {
			const nextDay = fullUserData.days[i];
			const nextEx = nextDay.exercise;
			if (!insertedExercises.has(nextEx)) {
				result.days.push(nextDay);
				insertedExercises.add(nextEx);
				count++;
				if (count >= 3) {
					break;
				}
			}
		}
		return result;
	};

	return { setUser, setUserData, setConvenienceData, parseConvenienceData, getState };
};

export const useStore = (): StoreInstance => {
	return inject(storeSymbol, createStore());
};
