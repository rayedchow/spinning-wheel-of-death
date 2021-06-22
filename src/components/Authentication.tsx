import React from 'react';
import '../styles/Authentication.css';

interface AuthProps {
	email: string
}

const Authentication: React.FC<AuthProps> = ({ email }) => {

	localStorage.setItem('auth', 'true');

	return (
		<div className="authPage">
			<div className="authHeader">
				Account Not Authenticated
			</div>
			<div className="authDesc">
				This Google Account (<span className="authEmail">{email}</span>) does not have a Spinning Wheel of Death License. To use this application, we ask that you buy the  license to help fund the site. Please purchase one <span className="link">here</span>.
			</div>
		</div>
	)
}

export default Authentication;