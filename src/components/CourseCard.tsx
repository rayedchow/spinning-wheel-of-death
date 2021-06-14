import React, { useContext } from 'react';
import { Course } from '../@types/Classroom';
import { SelectedClassContext } from '../data/Store';
import './CourseCard.css';

interface CourseProps {
	course: Course
}

const CourseCard: React.FC<CourseProps> = ({ course }) => {

	const [selectedClass, setSelectedClass] = useContext(SelectedClassContext);

	const updateSelectedClass = () => setSelectedClass(course);

	return (
		<div 
			className={`courseCard${(selectedClass === course) ? ' selectedCourse' : ''}`}
			onClick={updateSelectedClass}
		>
			<div className="courseName">
				{course.name}
			</div>
		</div>
	);
}

export default CourseCard;