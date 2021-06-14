import React, { useContext, useEffect, useState } from 'react';
import { FaRegTimesCircle, FaPlus } from 'react-icons/fa';
import { Student } from '../@types/Classroom';
import { getStudentName, updateJSON } from '../data/GoogleAPI';
import { LocalStorageContext, NonRemovedContext, SelectedClassStudentsContext } from '../data/Store';
import './StudentCard.css';

interface StudentProps {
	student: Student
}

const iconSize = window.innerWidth*0.014;

const StudentCard: React.FC<StudentProps> = ({ student }) => {

	const [localStorageJSON, setLocalStorageJSON] = useContext(LocalStorageContext);
	const [studentRemoved, setStudentRemoved] = useState(localStorageJSON[student.userId]);
	const [nonRemoved, setNonRemoved] = useContext(NonRemovedContext);
	const [selectedClassStudents] = useContext(SelectedClassStudentsContext);

	const addStudent = () => {
		let currJSON = localStorageJSON;
		delete currJSON[student.userId];
		setLocalStorageJSON(currJSON);
		updateJSON(localStorageJSON, student.courseId);
		setStudentRemoved(false);
		setNonRemoved(selectedClassStudents.filter(student => !localStorageJSON[student.userId]));
	}

	const remStudent = () => {
		let currJSON = localStorageJSON;
		currJSON[student.userId] = true;
		setLocalStorageJSON(currJSON);
		updateJSON(localStorageJSON, student.courseId);
		setStudentRemoved(true);
		setNonRemoved(selectedClassStudents.filter(student => !localStorageJSON[student.userId]));
	}

	useEffect(() => {
		setStudentRemoved(localStorageJSON[student.userId]);
		setNonRemoved(selectedClassStudents.filter(student => !localStorageJSON[student.userId]));
	}, [localStorageJSON, student.userId, selectedClassStudents, setNonRemoved]);

	useEffect(() => {
		setStudentRemoved(localStorageJSON[student.userId]);
	}, [nonRemoved])

	if(studentRemoved) {
		return (
			<div className="studentCard studentRemoved">
				<div className="studentName">
					{getStudentName(student.profile.name.fullName)}
				</div>
				<div className="studentSettings">
					<FaPlus className="studentAdd studentSetting" size={Math.ceil(iconSize)} onClick={addStudent} />
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
				<FaRegTimesCircle className="studentRem studentSetting" size={Math.ceil(iconSize)} onClick={remStudent} />
			</div>
		</div>
	);
}

export default StudentCard;