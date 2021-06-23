import React, { useContext, useEffect, useState } from 'react';
import { FaRegTimesCircle, FaPlus } from 'react-icons/fa';
import { Student } from '../@types/Classroom';
import { addStudentData, getStudentName, remStudentData } from '../data/GoogleAPI';
import { EmailDataContext, SelectedClassStudentsContext, UserDataContext } from '../data/Store';
import '../styles/StudentCard.css';

interface StudentProps {
	student: Student
}

const iconSize = window.innerWidth*0.014;

const StudentCard: React.FC<StudentProps> = ({ student }) => {

	const [userData, setUserData] = useContext(UserDataContext);
	const [selectedClassStudents] = useContext(SelectedClassStudentsContext);
	const [emailData] = useContext(EmailDataContext);

	const classIndex = userData.classData.findIndex((classObj) => 
		classObj.classId === student.courseId
	);

	const [studentRemoved, setStudentRemoved] = useState(false);

	const addStudent = () => {
		addStudentData(emailData, student.courseId, student.userId, async (data) => setUserData(data));
	}

	const remStudent = () => {
		remStudentData(emailData, student.courseId, student.userId, async (data) => setUserData(data));
	}

	useEffect(() => {
		if(classIndex === -1) {
			setStudentRemoved(false);
		} else {
			setStudentRemoved((userData.classData[classIndex].removedStudents.indexOf(student.userId) > -1));
		}
		
	}, [userData, student.userId, selectedClassStudents]);

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