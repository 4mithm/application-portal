import React from "react";
import Navbar from "./navbar";
import About from "./about";
import Login from "./login";
import SignUp from "./signup";
import { Route, Routes } from "react-router-dom";



export default function Portal() {
	return (
		<>
			<Navbar />
			
			

			<Routes>
				<Route exact path="/*" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</>
	);
}
