import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import colorData from '../data/colorData.json';
import Confetti from 'react-dom-confetti';
import Wheel from './Wheel';
import { ClassListContext, SelectedClassContext, SelectedClassStudentsContext } from '../data/Store';
import { Course, Student } from '../@types/Classroom';
import StudentCard from './StudentCard';
import { getStudentName } from '../data/GoogleAPI';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CourseCard from './CourseCard';

interface mainProps {
	segments: string[]
}

const Main: React.FC<mainProps> = ({ segments }) => {

	const [confetti, startConfetti] = useState(false);
	const [page, setPage] = useState(0);
	const [currentPageStudents, setCurrentPageStudents] = useState([]);
	const [selectedClass] = useContext(SelectedClassContext);
	const [selectedClassStudents] = useContext(SelectedClassStudentsContext);
	const [classList] = useContext(ClassListContext);

	const onFinished = (winner: number) => {
		console.log(segments[winner]);
		startConfetti(true);
		startConfetti(false);
	}

	while(colorData.length < segments.length) {
		colorData.push(colorData[Math.floor(Math.random()*colorData.length)]);
	}

	// setCurrentPageStudents();

	const nextPage = () => {
		if(selectedClassStudents.length-((page+1)*12) > 0) setPage(page+1);
	}

	const prevPage = () => {
		if(page > 0) setPage(page-1);
	}

	useEffect(() => {
		const deltaPageCurrents = [];
		let index = page*12;
		while(index < ((selectedClassStudents.length-(page*12) > 12) ? 12 : selectedClassStudents.length-(page*12) % 12)) {
			deltaPageCurrents.push(selectedClassStudents[index]);
			console.log(deltaPageCurrents);
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
						{currentPageStudents.map((selectedClassStudent: Student) => (
							// <StudentCard name={getStudentName(selectedClassStudent.profile.name.fullName)} />
							<StudentCard name={selectedClassStudent.profile.name.fullName} />
						))}
					</div>
					<div className="listControls">
						<button className="btn successGradient">
							Add
						</button>
						<div className="pagination">
							<FaAngleLeft className="pagIcon" onClick={prevPage} />
							<FaAngleRight className="pagIcon" onClick={nextPage} />
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
					<div className="courseCards">
						{classList.map((course: Course) => (
							<CourseCard course={course} />
						))}
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