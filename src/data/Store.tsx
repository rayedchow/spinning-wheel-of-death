import React, { useState } from 'react';
import { Course, Student } from '../@types/Classroom';

const initialSelectedClass: Course = {
	id: '',
	name: '',
	ownerId: '',
	courseState: 'ACTIVE'
};

const initialSelectedClassStudents: Student[] = [
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 1'
			}
		},
		removed: true
	}
];

const initialClassList: Course[] = [];

export const SelectedClassContext = React.createContext([]);
export const SelectedClassStudentsContext = React.createContext([]);
export const ClassListContext = React.createContext([]);

const Store = ({ children }) => {
	const [selectedClass, setSelectedClass] = useState<Course>(initialSelectedClass);
	const [selectedClassStudents, setSelectedClassStudents] = useState<Student[]>(initialSelectedClassStudents);
	const [classList, setClassList] = useState<Course[]>(initialClassList);

	return (
		<>
			<ClassListContext.Provider value={[classList, setClassList]}>
				<SelectedClassStudentsContext.Provider value={[selectedClassStudents, setSelectedClassStudents]}>
					<SelectedClassContext.Provider value={[selectedClass, setSelectedClass]}>
						{children}
					</SelectedClassContext.Provider>
				</SelectedClassStudentsContext.Provider>
			</ClassListContext.Provider>
		</>
	);
}

export default Store;