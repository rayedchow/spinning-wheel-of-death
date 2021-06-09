import React from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import './StudentCard.css';

interface StudentProps {
	name: string
}

const StudentCard: React.FC<StudentProps> = ({ name }) => {
	return (
		<div className="studentCard">
			{name.length < 10 ? (
				<div className="studentName">
					{name}
				</div>
			) : (
				<div className="studentName">
					{name.substring(0, 8) + '...'}
				</div>
			)}
			<div className="studentSettings">
				<FaRegTimesCircle className="studentRem" />
			</div>
		</div>
	)
}

export default StudentCard;