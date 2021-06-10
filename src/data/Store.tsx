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
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 2'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 3'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 4'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 5'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 6'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 7'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 8'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 9'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 10'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 11'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 12'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 13'
			}
		}
	},
	{
		courseId: '',
		userId: '',
		profile: {
			id: '',
			name: {
				givenName: '',
				fullName: 'Student 14'
			}
		}
	}
];

export const SelectedClassContext = React.createContext([]);
export const SelectedClassStudentsContext = React.createContext([]);

const Store = ({ children }) => {
	const [selectedClass, setSelectedClass] = useState<Course>(initialSelectedClass);
	const [selectedClassStudents, setSelectedClassStudents] = useState<Student[]>(initialSelectedClassStudents);

	return (
		<>
			<SelectedClassStudentsContext.Provider value={[selectedClassStudents, setSelectedClassStudents]}>
				<SelectedClassContext.Provider value={[selectedClass, setSelectedClass]}>
					{children}
				</SelectedClassContext.Provider>
			</SelectedClassStudentsContext.Provider>
		</>
	);
}

export default Store;