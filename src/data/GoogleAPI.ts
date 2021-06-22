import axios from 'axios';
import { Course, Student } from '../@types/Classroom';
import clientIDJSON from './clientID.json';

export const getClassList = async (token: string, callback: (courseList: Course[]) => void) => {
	axios.get('https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(courseListData => {
		callback(courseListData.data.courses);
	});
}

export const getStudentList = async (classId: string, token: string, callback: (studentList: Student[]) => void) => {
	axios.get(`https://classroom.googleapis.com/v1/courses/${classId}/students`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(studentListData => {
		callback(studentListData.data.students);
	});
}

export const updateJSON = (localStorageJSON: Object, key: string) => {
	localStorage.setItem(key, JSON.stringify(localStorageJSON));
}

export const getStudentName = (fullName: string): string => {
	const splitName = fullName.split(' ');
	const studentName = (splitName.length > 1) ? `${splitName[0]} ${splitName[1].substr(0, 1)}` : fullName;

	return studentName;
}

export const getUserData = (email: string) => {
	axios({
		method: 'POST',
		url: `${clientIDJSON.apiURL}/data/getData`,
		data: {
			email
		}
	}).then(requestData => {
		console.log(requestData.data);
	});
}

export const isUserAuthenticated = async (email: string, callback: (authenticated: boolean) => void) => {
	axios({
		method: 'POST',
		url: `${clientIDJSON.apiURL}/auth/isUserAuthenticated`,
		data: {
			email
		}
	}).then(requestData => {
		callback(requestData.data.authenticated);
	});
}