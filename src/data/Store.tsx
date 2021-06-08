import React, { useState } from 'react';
import { Course } from '../@types/Classroom';

const initialCourse: Course = {
	id: '',
	name: '',
	ownerId: '',
	courseState: 'ACTIVE'
};

export const SelectedClassContext = React.createContext([]);

const Store = ({ children }) => {
	const [selectedClass, setSelectedClass] = useState<Course>(initialCourse);

	return (
		<>
			<SelectedClassContext.Provider value={[selectedClass, setSelectedClass]}>{children}</SelectedClassContext.Provider>
		</>
	);
}

export default Store;