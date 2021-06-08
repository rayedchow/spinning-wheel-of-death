import React, { useState } from 'react';
import './App.css';
import Main from './components/Main';
import GoogleLogin from 'react-google-login';
import { getClassList, getStudentList } from './Data'

const clientID = process.env.REACT_APP_CLIENT_ID;

const App: React.FC = () => {

	const [segments, setSegments] = useState([]);
	const [loggedIn, boolLoggedIn] = useState(false);

	const onGoogleSuccess = async (res) => {
		console.log(res);

		const accessToken = res.tokenObj.access_token;
		const currSegments = [];

		await getClassList(accessToken, classList => {
			classList.forEach(async (classData) => {
				await getStudentList(classData.id, accessToken, studentList => {
					studentList.forEach(student => {
						currSegments.push(student.profile.name.givenName);
					});
				});
				setSegments(currSegments);
			});
		});

		boolLoggedIn(true);
	}

	return (
		<>
			<div id="navbar">
			</div>
			{!loggedIn && 
				<GoogleLogin 
					clientId={clientID}
					buttonText="Login"
					onSuccess={onGoogleSuccess}
					cookiePolicy="single_host_origin"
					scope="openid https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
					isSignedIn={true}
				/>
			}
			
			{loggedIn &&
				<Main segments={segments} />
			}
		</>
	);
}

export default App;
