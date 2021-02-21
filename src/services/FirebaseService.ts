import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { UserData, AppUser } from '../store';

const configOptions = {
	apiKey: 'AIzaSyA7a901k5rFaSoJGnRXaa7IbuJruQVh_pM',
	authDomain: 'auth.easyworkout.app',
	projectId: 'workout-app-e5db1',
	storageBucket: 'workout-app-e5db1.appspot.com',
	messagingSenderId: '823373219552',
	appId: '1:823373219552:web:1eb03d3ed1637c8c50f285',
	measurementId: 'G-NT28P3L0PV'
};

const fbApp = firebase.initializeApp(configOptions);
let db = firebase.firestore(fbApp);

const parseFullForFirst = (fullName: string): string => {
	const re = new RegExp(/^(\w+)/);
	const matchArr = fullName.match(re);
	const groupMatch = matchArr && matchArr.length > 1 ? matchArr[1] : 'New User';
	return groupMatch;
};

export const writeUserData = async (
	uid: string,
	userData: UserData
): Promise<void> => {
	// need vanilla obj for firebase
	const objToWrite = { ...userData };
	if (!uid || !objToWrite) {
		return Promise.reject<void>(new Error('User data or uid is unavailable'));
	}

	// need vanilla obj [] for firebase
	const daysArr = objToWrite.days.map((nextDay) => {
		return { ...nextDay };
	});
	objToWrite.days = daysArr;

	await db
		.collection('histories')
		.doc(uid)
		.set(objToWrite);
};

export const readUserDataById = async (uid: string): Promise<UserData> => {
	const docRef = db.collection('histories').doc(uid);
	const doc = await docRef.get();

	let userData = new UserData();
	if (doc.exists && doc.data()) {
		const fsData: any = doc.data();
		userData = new UserData(fsData.days);
	}

	return userData;
};

export const performAuth = async (): Promise<AppUser> => {
	const provider = new firebase.auth.GoogleAuthProvider();

	const result = await firebase.auth().signInWithPopup(provider);

	const incomingUser = result.user;
	let appUser = new AppUser();
	if (incomingUser) {
		const fullName = incomingUser.displayName ? incomingUser.displayName : '';
		const name = parseFullForFirst(fullName);
		appUser = new AppUser(incomingUser.uid, name);
	}

	return appUser;
};

export const logout = async (): Promise<void> => {
	await firebase.auth().signOut();
};
