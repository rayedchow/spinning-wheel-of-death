import React, { useContext } from 'react';
import { Course } from '../@types/Classroom';
import { SelectedClassContext } from '../data/Store';
import './CourseCard.css';

interface CourseProps {
	course: Course
}

const CourseCard: React.FC<CourseProps> = ({ course }) => {

	const [selectedClass] = useContext(SelectedClassContext);

	return (
		<div className={`courseCard${(selectedClass == course) ? ' selectedCourse' : ''}`}>
			<div className="courseName">
				{course.name}
			</div>
		</div>
	);
}

export default CourseCard;