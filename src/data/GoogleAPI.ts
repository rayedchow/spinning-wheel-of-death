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

export const getSegments = async (token: string, selectedClass: Course, callback: (currSegments: string[]) => void) => {
	let currSegments = [];

	await getStudentList(selectedClass.id, token, studentList => {
		studentList.forEach(student => {
			currSegments.push(getStudentName(student.profile.name.fullName));
		});

		callback(currSegments);
	});
}

export const getStudentName = (fullName: string): string => {

	const splitName = fullName.split(' ');
	const studentName = (splitName.length > 1) ? `${splitName[0]} ${splitName[1].substr(0, 1)}` : fullName;

	return studentName;
}