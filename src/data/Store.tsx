import React, { useState } from 'react';
import { Course, Student } from '../@types/Classroom';

const initialSelectedClass: Course = {
	id: '',
	name: '',
	ownerId: '',
	courseState: 'ACTIVE'
};

const initialSelectedClassStudents: Student[] = [];

const initialClassList: Course[] = [
	{
		id: '',
		name: 'Course 123456789101112',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 2',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 3',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 4',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 5',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 6',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 7',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 8',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 9',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 10',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 11',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 12',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 13',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 14',
		ownerId: '',
		courseState: 'ACTIVE'
	},
	{
		id: '',
		name: 'Course 15',
		ownerId: '',
		courseState: 'ACTIVE'
	}
];

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