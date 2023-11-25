import React, { useEffect,useState } from "react";
import AdminNav from "./adminnav";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import AdminHome from "./adminhome";
import ManageApplication from "./manageappli";
import ManageRegister from "./managereg";
import Accepted from "./accepted";
import Rejected from "./rejected";
import Notify from "./notify";
import Feedbacks from "./feedbacks";
import ViewNotifies from "./viewnotify";
import AdminSupport from "./adminsupport";
import Search from "./search";
import ViewCourse from "./viewcourse";
import AddCourse from "./addcourse";
import axios from "axios";
export default function Admin() {
	let token = useParams();
	token = token.id;
	let navi = useNavigate();
	let [status,setStatus]=useState('');
	useEffect(adminsessioncheck, []);

	async function adminsessioncheck() {
		let fm = new FormData();
		fm.append("token", token);
		
		let	res = await axios.post(
			"http://localhost:8000/api/adminsessioncheck",
			fm
		);
		
		setStatus(res.data.status)
			
		
	}
if(!(status==='login')) return navi("/");
	



	return (
		<>
			<AdminNav token={token}/>
			<svg
				width="100%"
				height="100%"
				id="svg"
				viewBox="0 0 1440 200"
				xmlns="http://www.w3.org/2000/svg"
				className="transition duration-300 ease-in-out delay-150"
			>
				<path
					d="M 0,400 C 0,400 0,200 0,200 C 205.71428571428572,257.14285714285717 822.8571428571429,228.57142857142858 1440,200 C 1440,200 1440,400 1440,400 Z"
					stroke="none"
					strokeWidth="0"
					fill="#0693e3ff"
					className="transition-all duration-300 ease-in-out delay-150 path-0"
					transform="rotate(-180 720 200)"
				></path>
			</svg>
			<Routes>
				<Route path="" element={<AdminHome token={token} />} />
				<Route path="register" element={<ManageRegister token={token} />} />
				<Route
					path="application"
					element={<ManageApplication token={token} />}
				/>
				<Route path="accepted" element={<Accepted token={token} />} />
				<Route path="rejected" element={<Rejected token={token} />} />
				<Route path="notify" element={<Notify token={token} />} />
				<Route path="viewnotifies" element={<ViewNotifies token={token} />} />
				<Route path="feedbacks" element={<Feedbacks token={token} />} />
				<Route path="support" element={<AdminSupport token={token} />} />
				<Route path="search" element={<Search token={token} />} />
				<Route path="addcourse" element={<AddCourse token={token} />} />
				<Route path="deletecourse" element={<ViewCourse token={token} />} />
			</Routes>
		</>
	);
}
