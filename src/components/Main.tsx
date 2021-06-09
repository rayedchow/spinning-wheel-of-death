import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import colorData from '../data/colorData.json';
import Confetti from 'react-dom-confetti';
import Wheel from './Wheel';
import { SelectedClassContext, SelectedClassStudentsContext } from '../data/Store';
import { Course, Student } from '../@types/Classroom';
import StudentCard from './StudentCard';
import { getStudentName } from '../data/GoogleAPI';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface mainProps {
	segments: string[]
}

const Main: React.FC<mainProps> = ({ segments }) => {

	const [confetti, startConfetti] = useState(false);
	const [page, setPage] = useState(0);
	const [currentPageStudents, setCurrentPageStudents] = useState([]);
	const [selectedClass] = useContext(SelectedClassContext);
	const [selectedClassStudents] = useContext(SelectedClassStudentsContext);

	const onFinished = (winner: number) => {
		console.log(segments[winner]);
		startConfetti(true);
		startConfetti(false);
	}

	while(colorData.length < segments.length) {
		colorData.push(colorData[Math.floor(Math.random()*colorData.length)]);
	}

	// setCurrentPageStudents();

	useEffect(() => {
		const deltaPageCurrents = [];
		let index = page*12;
		while(deltaPageCurrents.length < selectedClassStudents.length-(page*12)) {
			deltaPageCurrents.push(selectedClassStudents[index]);
			index++;
		}
		setCurrentPageStudents(deltaPageCurrents);
	}, [segments, page]);

	return (
		<>
			<div className="main-container">
				<div className="container wheel-container">
					<Wheel
						list={segments} 
						onFinished={onFinished}
					/>
				</div>
				<div className="container student-container">
					<div className="container-heading">
						{selectedClass.name}
					</div>
					<div className="studentCards">
						{selectedClassStudents.map((selectedClassStudent: Student) => (
							<StudentCard name={getStudentName(selectedClassStudent.profile.name.fullName)} />
						))}
					</div>
					<div className="listControls">
						<button className="btn successGradient">
							Add
						</button>
						<div className="pagination">
							<FaAngleLeft className="pagIcon" />
							<FaAngleRight className="pagIcon" />
						</div>
						<button className="btn failGradient">
							Reset
						</button>
					</div>
				</div>
				<div className="container class-container">
					<div className="container-heading">
						Classes
					</div>
				</div>
				{/* <div className="confetti">
					<div id="c1">
						<Confetti active={confetti} />
						<Confetti active={confetti} />
					</div>
					<div id="c2">
						<Confetti active={confetti} />
						<Confetti active={confetti} />
					</div>
					<div id="c3">
						<Confetti active={confetti} />
						<Confetti active={confetti} />
					</div>
				</div> */}
			</div>
		</>
	);
}

export default Main;