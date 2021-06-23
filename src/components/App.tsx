import React, { useState, useEffect, useContext } from 'react';
import '../styles/App.css';
import Main from './Main';
import GoogleLogin from 'react-google-login';
import { getClassList, getStudentList, getUserData, isUserAuthenticated } from '../data/GoogleAPI';
import { ClassListContext, UserDataContext, SelectedClassContext, SelectedClassStudentsContext, EmailDataContext } from '../data/Store';
import clientIDJSON from '../data/clientID.json';
import Authentication from './Authentication';
import StudentPage from './StudentPage';

const clientID = clientIDJSON.clientID;

const App: React.FC = () => {

	const [selectedClass, setSelectedClass] = useContext(SelectedClassContext);
	const [, setSelectedClassStudents] = useContext(SelectedClassStudentsContext);
	const [, setClassList] = useContext(ClassListContext);
	const [, setUserData] = useContext(UserDataContext);
	const [, setEmailData] = useContext(EmailDataContext);
	const [loggedIn, boolLoggedIn] = useState(null);
	const [email, setEmail] = useState('');
	const [isUserStudent, setStudentBool] = useState(false);

	const onGoogleSuccess = async (res) => {
		console.log(res);

		if(!res.profileObj.email.includes('@bellevilleschools.org')) {
			isUserAuthenticated(res.profileObj.email, async (authenticated) => {
				if(!authenticated) {
					setEmail(res.profileObj.email);
				} else {
					localStorage.clear();
				}
			});
		}

		const accessToken = res.tokenObj.access_token;

		getUserData(res.profileObj.email, async (resUserData) => {
			setUserData(resUserData);
		});
		setEmailData(res.profileObj.email);

		getClassList(accessToken, res.profileObj.googleId, async (classListData, err) => {
			if(err) setStudentBool(true);
			else {
				if(classListData[0]) setSelectedClass(classListData[0]);
				setClassList(classListData);
			}
		});

		boolLoggedIn(res.tokenObj.access_token);
	}

	useEffect(() => {
		if(loggedIn) {
			getStudentList(selectedClass.id, loggedIn, async (studentListData) => {
				setSelectedClassStudents(studentListData);
			});
		}
	}, [selectedClass]);

	const onFooterClick = () => {
		window.open('https://github.com/voomp');
	}

	const onLogoutClick = () => {
		localStorage.setItem('auth', 'true');
		window.location.reload();
	}

	return (
		<>
			<div id="navbar">
				<div className="logo">
					spinningwheelofdeath
				</div>
				{loggedIn &&
					<div className="logout link" onClick={onLogoutClick}>
						logout
					</div>
				}
			</div>
			{!loggedIn &&
				<div className="loginContainer">
					<GoogleLogin 
						clientId={clientID}
						buttonText="Login"
						onSuccess={onGoogleSuccess}
						cookiePolicy="single_host_origin"
						scope="openid https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
						isSignedIn={(localStorage.getItem('auth') === null)}
						className="loginEmbed"
					/>
				</div>
			}
			
			{(loggedIn && !email) &&
				<>
					{isUserStudent ? (
						<StudentPage />
					) : (
						<Main />
					)}
				</>
			}

			{email &&
				<Authentication email={email} />
			}

			<footer className='creditsFooter'>
				programmed by <span onClick={onFooterClick} className="link">rayed</span>
			</footer>
		</>
	);
}

export default App;