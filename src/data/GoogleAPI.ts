import axios from 'axios';
import { Course, Student } from '../@types/Classroom';

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

export const getSegments = async (token: string, callback: (currSegments: string[]) => void) => {
	let currSegments = [];

	await getClassList(token, async (classList) => {

		let classIndex = 0;

		classList.forEach(async (classData) => {
			await getStudentList(classData.id, token, studentList => {
				studentList.forEach(student => {
					currSegments.push(student.profile.name.givenName);
				});

				classIndex += 1;
				if(classIndex === classList.length) {
					callback(currSegments);
				}
			});
		});
	});
}