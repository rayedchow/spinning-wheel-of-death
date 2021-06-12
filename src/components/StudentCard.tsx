import React, { useState } from 'react';
import { FaRegTimesCircle, FaPlus } from 'react-icons/fa';
import { Student } from '../@types/Classroom';
import { getStudentName } from '../data/GoogleAPI';
import './StudentCard.css';

interface StudentProps {
	student: Student
}

const StudentCard: React.FC<StudentProps> = ({ student }) => {

	const [studentRemoved, setStudentRemoved] = useState(student.removed);

	const addStudent = () => { 
		student.removed = false;
		setStudentRemoved(false);
	}

	const remStudent = () => {
		student.removed = true;
		setStudentRemoved(true);
	}

	if(student.removed) {
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