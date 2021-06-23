import React, { useState } from 'react';
import { Course, Student } from '../@types/Classroom';

const initialSelectedClass: Course = {
	id: '',
	name: '',
	ownerId: '',
	courseState: 'ACTIVE'
};

const initialSelectedClassStudents: Student[] = [];

const initialClassList: Course[] = [];

const initialUserData = {};

export const SelectedClassContext = React.createContext([]);
export const SelectedClassStudentsContext = React.createContext([]);
export const ClassListContext = React.createContext([]);
export const UserDataContext = React.createContext([]);
export const EmailDataContext = React.createContext([]);

const Store = ({ children }) => {
	const [selectedClass, setSelectedClass] = useState<Course>(initialSelectedClass);
	const [selectedClassStudents, setSelectedClassStudents] = useState<Student[]>(initialSelectedClassStudents);
	const [classList, setClassList] = useState<Course[]>(initialClassList);
	const [userData, setUserData] = useState(initialUserData);
	const [emailData, setEmailData] = useState<string>('');

	return (
		<>
			<EmailDataContext.Provider value={[emailData, setEmailData]}>
			<UserDataContext.Provider value={[userData, setUserData]}>
				<ClassListContext.Provider value={[classList, setClassList]}>
					<SelectedClassStudentsContext.Provider value={[selectedClassStudents, setSelectedClassStudents]}>
						<SelectedClassContext.Provider value={[selectedClass, setSelectedClass]}>
							{children}
						</SelectedClassContext.Provider>
					</SelectedClassStudentsContext.Provider>
				</ClassListContext.Provider>
			</UserDataContext.Provider>
			</EmailDataContext.Provider>
		</>
	);
}

export default Store;