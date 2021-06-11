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
	const [studentPage, setStudentPage] = useState(0);
	const [classPage, setClassPage] = useState(0);
	const [currentPageStudents, setCurrentPageStudents] = useState([]);
	const [currentPageClasses, setCurrentPageClasses] = useState([]);
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

	const nextStudentPage = () => {
		if(selectedClassStudents.length-((studentPage+1)*12) > 0) setStudentPage(studentPage+1);
	}

	const prevStudentPage = () => {
		if(studentPage > 0) setStudentPage(studentPage-1);
	}

	const nextClassPage = () => {
		if(classList.length-((classPage+1)*8) > 0) setClassPage(classPage+1);
	}

	const prevClassPage = () => {
		if(classPage > 0) setClassPage(classPage-1);
	}

	useEffect(() => {
		const deltaCurrentPageStudents = [];
		let studentIndex = studentPage*12;
		while(studentIndex < ((selectedClassStudents.length-(studentPage*12) > 12) ? 12 : selectedClassStudents.length-(studentPage*12) % 12)) {
			deltaCurrentPageStudents.push(selectedClassStudents[studentIndex]);
			studentIndex++;
		}
		setCurrentPageStudents(deltaCurrentPageStudents);

		const deltaCurrentPageClasses = [];
		let classIndex = classPage*8;
		while(classIndex < ((classList.length-(classPage*8) > 8) ? 8 : classList.length-(classPage*8) % 8)) {
			deltaCurrentPageClasses.push(classList[classIndex]);
			classIndex++;
		}
		setCurrentPageClasses(deltaCurrentPageClasses);

	}, [segments, studentPage, classPage]);

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
							<StudentCard name={getStudentName(selectedClassStudent.profile.name.fullName)} />
						))}
					</div>
					<div className="listControls">
						<button className="btn successGradient">
							Add
						</button>
						<div className="pagination">
							<FaAngleLeft className="pagIcon" onClick={prevStudentPage} />
							<FaAngleRight className="pagIcon" onClick={nextStudentPage} />
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
						{currentPageClasses.map((course: Course) => (
							<CourseCard course={course} />
						))}
					</div>
					<div className="listControls">
						<div className="pagination">
							<FaAngleLeft className="pagIcon" onClick={prevClassPage} />
							<FaAngleRight className="pagIcon" onClick={nextClassPage} />
						</div>
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