import React ,{useEffect}from "react";
import StudentNav from "./studentnav";
import StudentForm from "./studentform";
import StudEditForm from "./studeditform";
import StudStatus from "./studstatus";
import { Route, Routes, useParams,useNavigate } from "react-router-dom";
import View from "./view";
import Feedback from "./feedback";
import Support from "./support";
import Notifications from "./notifications";
import StudHome from "./studhome";
import { useState } from "react";
import axios from "axios";

export default function Student() {
	let token = useParams();
	token=token.id
	console.log("id----------------------------------------------------\n");
	console.log(token);
	let navi = useNavigate();
	let [status,setStatus]=useState('');
	useEffect(studsessioncheck, []);

	async function studsessioncheck() {
		let fm = new FormData();
		fm.append("token", token);
		
		let	res = await axios.post(
			"http://localhost:8000/api/studsessioncheck",
			fm
		);
		
		setStatus(res.data.status)
			
		
	}
if(!(status==='login')) return navi("/");
	

	return (
		<>
			<StudentNav token={token} />
			<svg
				width="100%"
				height="100%"
				id="svg"
				viewBox="0 0 1440 250"
				xmlns="http://www.w3.org/2000/svg"
				className="transition duration-300 ease-in-out delay-150"
			>
				<path
					d="M 0,400 C 0,400 0,200 0,200 C 164.93333333333334,170.93333333333334 329.8666666666667,141.86666666666665 504,152 C 678.1333333333333,162.13333333333335 861.4666666666667,211.4666666666667 1019,226 C 1176.5333333333333,240.5333333333333 1308.2666666666667,220.26666666666665 1440,200 C 1440,200 1440,400 1440,400 Z"
					stroke="none"
					strokeWidth="0"
					fill="#eb144cff"
					className="transition-all duration-300 ease-in-out delay-150 path-0"
					transform="rotate(-180 720 200)"
				></path>
			</svg>
			<div className="studroute">
				<Routes>
					<Route path="" element={<StudHome token={token} />} />
					<Route path="form" element={<StudentForm token={token} />} />
					<Route path="view" element={<View token={token} />} />
					<Route path="status" element={<StudStatus token={token} />} />
					<Route path="editform" element={<StudEditForm token={token} />} />
					<Route
						path="notification"
						element={<Notifications token={token} />}
					/>
					<Route path="feedback" element={<Feedback token={token} />} />
					<Route path="support" element={<Support token={token} />} />
				</Routes>
			</div>
		</>
	);
}
