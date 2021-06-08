import axios from 'axios';
import { Course, Student } from './@types/Classroom';

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