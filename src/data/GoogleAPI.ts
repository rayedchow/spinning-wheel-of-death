import axios from 'axios';
import { Course, Student } from '../@types/Classroom';
import clientIDJSON from './clientID.json';

export const getClassList = async (token: string, studentId: string, callback: (courseList: Course[], studentError?: boolean) => void) => {
	axios.get('https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(async (courseListData) => {
		let studentCourses = 0;
		let i = 0;
		await courseListData.data.courses.forEach(async (course: Course) => {
			getStudentList(course.id, token, async (studentList) => {
				if(studentList[0].userId === studentId) studentCourses++;
				i++;
				if(studentCourses >= courseListData.data.courses.length) callback(courseListData.data.courses, true);
				else if(i === courseListData.data.courses.length) {
					callback(courseListData.data.courses);
				}
			});
		});
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

export const getStudentName = (fullName: string): string => {
	const splitName = fullName.split(' ');
	const studentName = (splitName.length > 1) ? `${splitName[0]} ${splitName[1].substr(0, 1)}` : fullName;

	return studentName;
}

export const getUserData = (email: string, callback: (userData: Object) => void) => {
	axios({
		method: 'POST',
		url: `${clientIDJSON.apiURL}/data/getData`,
		data: {
			email
		}
	}).then(requestData => {
		console.log(requestData);
		callback(requestData.data);
	});
}

export const resetStudentData = (email: string, classId: string, callback: (userData: Object) => void) => {
	axios({
		method: 'POST',
		url: `${clientIDJSON.apiURL}/data/resetStudents`,
		data: {
			email,
			classId
		}
	}).then(requestData => {
		callback(requestData.data);
	});
}

export const addStudentData = (email: string, classId: string, studentId: string, callback: (userData: Object) => void) => {
	axios({
		method: 'POST',
		url: `${clientIDJSON.apiURL}/data/addStudent`,
		data: {
			email,
			classId,
			studentId
		}
	}).then(requestData => {
		callback(requestData.data);
	});
}

export const remStudentData = (email: string, classId: string, studentId: string, callback: (userData: Object) => void) => {
	axios({
		method: 'POST',
		url: `${clientIDJSON.apiURL}/data/removeStudent`,
		data: {
			email,
			classId,
			studentId
		}
	}).then(requestData => {
		callback(requestData.data);
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