import React, { useState, useRef, useEffect, useContext } from 'react';
import '../styles/Wheel.css';
import colorData from '../data/colorData.json';
import { EmailDataContext, SelectedClassContext, SelectedClassStudentsContext, UserDataContext } from '../data/Store';
import { getStudentName, remStudentData } from '../data/GoogleAPI';
import { Student } from '../@types/Classroom';

interface wheelProps {
	onFinished: (winningItem: number) => void
}

let colors = [];

const Wheel: React.FC<wheelProps> = ({ onFinished }) => {

	const radius = 75;

	const [rotate, setRotate] = useState(0);
	const [easeOut, setEaseOut] = useState(0);
	const [angle, setAngle] = useState(0);
	const [top, setTop] = useState(null);
	const [offset, setOffset] = useState(null);
	const [, setNet] = useState(null);
	const [result, setResult] = useState(null);
	const [spinning, setSpinning] = useState(false);
	const [spinCount, setSpinCount] = useState(0);
	const [selectedClassStudents] = useContext(SelectedClassStudentsContext);
	const [userData, setUserData] = useContext(UserDataContext);
	const [selectedClass] = useContext(SelectedClassContext);
	const [emailData] = useContext(EmailDataContext);

	let classIndex = -1;
	let nonRemoved: Student[] = [];
	if(userData.classData) {
		classIndex = userData.classData.findIndex((classObj) => 
			classObj.classId === selectedClass.id
		);

		if(classIndex > -1) {
			nonRemoved = selectedClassStudents.filter(student => 
				(userData.classData[classIndex].removedStudents.indexOf(student.userId) === -1)
			);
		} else {
			nonRemoved = selectedClassStudents;
		}
		
	}

	while(nonRemoved.length > colors.length) {
		colors.push(colorData[Math.floor(Math.random() * colorData.length)]);
	}

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const renderWheel = () => {

		if(!canvasRef.current) return;

		// determine number/size of sectors that need to created
		let numOptions = nonRemoved.length;
		let arcSize = (2 * Math.PI) / numOptions;
		setAngle(arcSize);
	
		// get index of starting position of selector
		topPosition(numOptions, arcSize);
	
		// dynamically generate sectors from state list
		let angle = 0;
		for (let i = 0; i < numOptions; i++) {
			let text = getStudentName(nonRemoved[i].profile.name.fullName);
			renderSector(i + 1, text, angle, arcSize);
			angle += arcSize;
		}
	}
  
	const topPosition = (num, angle) => {
		// set starting index and angle offset based on list length
		// works upto 9 options
		let topSpot = null;
		let degreesOff = null;
		if (num === 9) {
			topSpot = 7;
			degreesOff = Math.PI / 2 - angle * 2;
		} else if (num === 8) {
			topSpot = 6;
			degreesOff = 0;
		} else if (num <= 7 && num > 4) {
			topSpot = num - 1;
			degreesOff = Math.PI / 2 - angle;
		} else if (num === 4) {
			topSpot = num - 1;
			degreesOff = 0;
		} else if (num <= 3) {
			topSpot = num;
			degreesOff = Math.PI / 2;
		}
  
		setTop(topSpot - 1);
		setOffset(degreesOff);
	}
  
	const renderSector = (index, text, start, arc) => {
		// create canvas arc for each list element
		let ctx = canvasRef.current.getContext("2d");
		let x = canvasRef.current.width / 2;
		let y = canvasRef.current.height / 2;
		let startAngle = start;
		let endAngle = start + arc;
		let angle = index * arc;
		let baseSize = radius * 3.33;
		let textRadius = baseSize - 150;
	
		ctx.beginPath();
		ctx.arc(x, y, radius, startAngle, endAngle, false);
		ctx.lineWidth = radius * 2;
		ctx.strokeStyle = colorData[Math.floor(Math.random() * colorData.length)];
		
		if(text.length > 12) text = text.substring(0, 8) + '...';

		ctx.font = `17px Montserrat`;
		ctx.fillStyle = "white";
		ctx.stroke();
	
		ctx.save();
		ctx.translate(
		  baseSize + Math.cos(angle - arc / 2) * textRadius,
		  baseSize + Math.sin(angle - arc / 2) * textRadius
		);
		
		let rotation = angle - arc / 2 + Math.PI / 2;
		if(baseSize + Math.cos(angle - arc / 2) * textRadius < 240) {
			rotation += 1.8;
		} else {
			rotation -= 1.8;
		}

		ctx.rotate(rotation);
		ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		ctx.restore();
	}
  
	const spin = () => {
		// set random spin degree and ease out time
		// set state variables to initiate animation
		let randomSpin = Math.floor(Math.random() * 1000) + 1500;

		setRotate(randomSpin);
		setEaseOut(5);
		setSpinning(true);
  
		// calcalute result after wheel stops spinning
		setTimeout(() => {
			getResult(randomSpin);
		}, 5000);
	};
  
	const getResult = spin => {
		// find net rotation and add to offset angle
		// repeat substraction of inner angle amount from total distance traversed
		// use count as an index to find value of result from state list

		let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
		let travel = netRotation + offset;
		let count = top + 1;
		while (travel > 0) {
			travel = travel - angle;
			count--;
		}
		let spinResult;
		if (count >= 0) {
			spinResult = count;
		} else {
			spinResult = nonRemoved.length + count;
		}

		setSpinCount(spinCount+1);
  
		onFinished(spinResult);
		setNet(netRotation);
		setResult(spinResult);
	};

	const reset = () => {

		remStudentData(emailData, nonRemoved[result].courseId, nonRemoved[result].userId, async (data) => setUserData(data));

		// reset wheel and result
		setRotate(0);
		setEaseOut(0);
		setResult(null);
		setSpinning(false);
	};

	useEffect(() => {
		renderWheel();
	}, [selectedClassStudents, nonRemoved]);

	return (
			<>
				<div className="wheelComponent">
					<div id="wheel">
						<canvas
							ref={canvasRef}
							id="wheelCanvas"
							width="500"
							height="500"
							style={{
								WebkitTransform: `rotate(${rotate}deg)`,
								WebkitTransition: `-webkit-transform ${
								easeOut
								}s ease-out`
							}}
						/>
					</div>
					<div className="wheelSettings">
						{spinning ? (
							<>
								{nonRemoved[result] && 
									<div className="winner">
										Winner: {getStudentName(nonRemoved[result].profile.name.fullName)}
									</div>
								}
								<button className="btn failGradient" onClick={reset}>
									Reset
								</button>
							</>
						) : (
							<button className="btn successGradient" onClick={spin}>
								Spin
							</button>
						)}
					</div>
				</div>
			</>
	);
}

export default Wheel;