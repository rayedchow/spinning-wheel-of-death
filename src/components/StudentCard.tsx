import React, { useContext, useEffect, useState } from 'react';
import { FaRegTimesCircle, FaPlus } from 'react-icons/fa';
import { Student } from '../@types/Classroom';
import { getStudentName, updateJSON } from '../data/GoogleAPI';
import { LocalStorageContext } from '../data/Store';
import './StudentCard.css';

interface StudentProps {
	student: Student
}

const StudentCard: React.FC<StudentProps> = ({ student }) => {

	const [localStorageJSON, setLocalStorageJSON] = useContext(LocalStorageContext);
	const [studentRemoved, setStudentRemoved] = useState(localStorageJSON[student.userId]);

	const addStudent = () => {
		setLocalStorageJSON(currJSON => {
			delete currJSON[student.userId];
			return currJSON;
		});
		updateJSON(localStorageJSON, student.courseId);
		setStudentRemoved(false);
	}

	const remStudent = () => {
		setLocalStorageJSON(currJSON => {
			currJSON[student.userId] = true;
			return currJSON;
		});
		updateJSON(localStorageJSON, student.courseId);
		setStudentRemoved(true);
	}

	useEffect(() => {
		setStudentRemoved(localStorageJSON[student.userId]);
	}, [localStorageJSON, student.userId]);

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