import React, { useContext, useEffect, useState } from 'react';
import '../styles/Main.css';
import Confetti, { ConfettiConfig } from 'react-dom-confetti';
import Wheel from './Wheel';
import { ClassListContext, LocalStorageContext, SelectedClassContext, SelectedClassStudentsContext } from '../data/Store';
import { Course, Student } from '../@types/Classroom';
import StudentCard from './StudentCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CourseCard from './CourseCard';

const confettiConfig: ConfettiConfig = {
	spread: 360,
	duration: 4000,
	width: `${window.innerWidth * 0.01}px`,
	height: `${window.innerHeight * 0.01}px`
}

const iconSize = window.innerWidth*0.028;

const Main: React.FC = () => {

	const [confetti, startConfetti] = useState(false);
	const [studentPage, setStudentPage] = useState(0);
	const [classPage, setClassPage] = useState(0);
	const [currentPageStudents, setCurrentPageStudents] = useState([]);
	const [currentPageClasses, setCurrentPageClasses] = useState([]);
	const [selectedClass] = useContext(SelectedClassContext);
	const [selectedClassStudents] = useContext(SelectedClassStudentsContext);
	const [classList] = useContext(ClassListContext);
	const [, setLocalStorageJSON] = useContext(LocalStorageContext);

	const onFinished = (index: number) => {
		startConfetti(true);
		startConfetti(false);
	}

	const nextStudentPage = () => {
		if(studentPage < Math.ceil(selectedClassStudents.length/12)) setStudentPage(studentPage+1);
	}

	const prevStudentPage = () => {
		if(studentPage > 0) setStudentPage(studentPage-1);
	}

	const nextClassPage = () => {
		if(classPage < Math.ceil(classList.length/8)) setClassPage(classPage+1);
	}

	const prevClassPage = () => {
		if(classPage > 0) setClassPage(classPage-1);
	}

	const resetStudents = () => {
		setLocalStorageJSON({});
		localStorage.setItem(selectedClass.id, '{}');
	}

	useEffect(() => {
		
		const maxStudentPages = Math.ceil(selectedClassStudents.length/12);
		if(studentPage < maxStudentPages) {
			const deltaCurrentPageStudents = [];
			let studentIndex = studentPage*12;

			while(studentIndex < ((studentPage+1)*12)) {
				if(selectedClassStudents[studentIndex]) deltaCurrentPageStudents.push(selectedClassStudents[studentIndex]);
				studentIndex++;
			}

			setCurrentPageStudents(deltaCurrentPageStudents);
		}

		const maxClassPages = Math.ceil(classList.length/8);
		if(classPage < maxClassPages) {
			const deltaCurrentPageClasses = [];
			let classIndex = classPage*8;

			while(classIndex < ((classPage+1)*8)) {
				if(classList[classIndex]) deltaCurrentPageClasses.push(classList[classIndex]);
				classIndex++;
			}

			setCurrentPageClasses(deltaCurrentPageClasses);
		}

	}, [selectedClassStudents, studentPage, classPage, classList]);

	return (
		<>
			<div className="confettiContainer">
				<div className="confetti">
					<Confetti active={confetti} config={confettiConfig} />
				</div>
			</div>
			<div className="main-container">
				<div className="container wheel-container">
					<Wheel
						onFinished={onFinished}
					/>
				</div>
				<div className="container student-container">
					<div className="container-heading">
						{selectedClass.name}
					</div>
					<div className="studentCards">
						{currentPageStudents.map((selectedClassStudent: Student) => (
							<StudentCard student={selectedClassStudent} key={`${selectedClassStudents.courseId} ${selectedClassStudents.userId}`} />
						))}
					</div>
					<div className="listControls">
						<button className="btn failGradient" onClick={resetStudents}>
							Reset
						</button>
						<div className="pagination">
							<FaAngleLeft className="pagIcon" onClick={prevStudentPage} size={iconSize} />
							<FaAngleRight className="pagIcon" onClick={nextStudentPage} size={iconSize} />
						</div>
					</div>
				</div>
				<div className="container class-container">
					<div className="container-heading">
						Classes
					</div>
					<div className="courseCards">
						{currentPageClasses.map((course: Course) => (
							<CourseCard course={course} key={course.id} />
						))}
					</div>
					<div className="listControls">
						<div className="pagination">
							<FaAngleLeft className="pagIcon" onClick={prevClassPage} size={iconSize} />
							<FaAngleRight className="pagIcon" onClick={nextClassPage} size={iconSize} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Main;