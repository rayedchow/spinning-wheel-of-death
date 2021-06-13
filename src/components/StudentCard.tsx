import React, { useState } from 'react';
import { FaRegTimesCircle, FaPlus } from 'react-icons/fa';
import { Student } from '../@types/Classroom';
import { getStudentName } from '../data/GoogleAPI';
import './StudentCard.css';

interface StudentProps {
	student: Student
}

const StudentCard: React.FC<StudentProps> = ({ student }) => {

	const localStorageJSON = JSON.parse(localStorage.getItem(student.courseId));
	const [studentRemoved, setStudentRemoved] = useState(localStorageJSON[student.userId]);

	const addStudent = () => {
		delete localStorageJSON[student.userId];
		updateJSON();
		setStudentRemoved(false);
	}

	const remStudent = () => {
		localStorageJSON[student.userId] = true;
		updateJSON();
		setStudentRemoved(true);
	}

	const updateJSON = () => {
		console.log(localStorageJSON);
		localStorage.setItem(student.courseId, JSON.stringify(localStorageJSON));
	}

	if(studentRemoved) {
		return (
			<div className="studentCard studentRemoved">
				<div className="studentName">
					{getStudentName(student.profile.name.fullName)}
				</div>
				<div className="studentSettings">
					<FaPlus className="studentAdd" onClick={addStudent} />
				</div>
			</div>
		);
	}

	return (
		<div className="studentCard">
			<div className="studentName">
				{getStudentName(student.profile.name.fullName)}
			</div>
			<div className="studentSettings">
				<FaRegTimesCircle className="studentRem" onClick={remStudent} />
			</div>
		</div>
	);
}

export default StudentCard;