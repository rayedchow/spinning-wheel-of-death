import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import colorData from '../colorData.json';
import Confetti from 'react-dom-confetti';
import Wheel from './Wheel';
import { SelectedClassContext } from '../data/Store';
import { Course } from '../@types/Classroom';

interface mainProps {
	segments: string[]
}

const Main: React.FC<mainProps> = ({ segments }) => {

	const [confetti, startConfetti] = useState(false);
	const [selectedClass] = useContext(SelectedClassContext);

	const onFinished = (winner: number) => {
		console.log(segments[winner]);
		startConfetti(true);
		startConfetti(false);
	}

	while(colorData.length < segments.length) {
		colorData.push(colorData[Math.floor(Math.random()*colorData.length)]);
	}

	useEffect(() => {}, [segments]);

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
					<div className="heading">
						{selectedClass.name}
					</div>
					<p>Student List</p>
				</div>
				<div className="container class-container">
					<p>Class List</p>
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
