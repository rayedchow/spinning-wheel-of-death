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

const initialLocalStorageJSON = {};

export const SelectedClassContext = React.createContext([]);
export const SelectedClassStudentsContext = React.createContext([]);
export const ClassListContext = React.createContext([]);
export const LocalStorageContext = React.createContext([]);

const Store = ({ children }) => {
	const [selectedClass, setSelectedClass] = useState<Course>(initialSelectedClass);
	const [selectedClassStudents, setSelectedClassStudents] = useState<Student[]>(initialSelectedClassStudents);
	const [classList, setClassList] = useState<Course[]>(initialClassList);
	const [localStorageJSON, setLocalStorageJSON] = useState(initialLocalStorageJSON);

	return (
		<>
			<LocalStorageContext.Provider value={[localStorageJSON, setLocalStorageJSON]}>
				<ClassListContext.Provider value={[classList, setClassList]}>
					<SelectedClassStudentsContext.Provider value={[selectedClassStudents, setSelectedClassStudents]}>
						<SelectedClassContext.Provider value={[selectedClass, setSelectedClass]}>
							{children}
						</SelectedClassContext.Provider>
					</SelectedClassStudentsContext.Provider>
				</ClassListContext.Provider>
			</LocalStorageContext.Provider>
		</>
	);
}

export default Store;