import React from 'react';
import './StudentPage.css';

const Authentication: React.FC = () => {

	localStorage.setItem('auth', 'true');

	return (
		<div className="studentPage">
			<div className="studentAuthHeading">
				Must be a Teacher
			</div>
			<div className="studentAuthDesc">
				You should be a teacher for at least one of your google classrooms  to be able to use this application. This application is made for teachers to view their classes and manage their students. Try refreshing and signing in with a teacher google account.
			</div>
		</div>
	)
}

export default Authentication;