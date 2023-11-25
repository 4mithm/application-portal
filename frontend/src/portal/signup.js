import React from "react";
import { useState } from "react";
import "./signuplogin.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import { minWidth } from "@mui/system";
import Banner from "./components/Banner";
import LoginSvg from "./loginsignupsvg";
const myclass = {
	input: {
		fontSize: 17,
		fontFamily: "Poppins",
		marginRight: "30px",
		width: "250px",
	},
	label: {
		fontSize: 15,
		fontFamily: "Poppins",
	},
};
export default function SignUp() {
	const navigate = useNavigate();
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confpassword, setConfPassword] = useState("");

	async function signUp(e) {
		e.preventDefault();

		if (firstname.trim() === "") {
			await swal("Enter FirstName", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		if (lastname.trim() === "") {
			await swal("Enter LastName", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		if (email.trim() === "") {
			await swal("Enter Email", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!email.match(mailformat)) {
			await swal("Enter Correct Email", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}

		if (password.trim() === "") {
			await swal("Enter Password", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		var passw = /^[A-Za-z]\w{7,14}$/;
		if (!password.match(passw)) {
			await swal({
				icon: "warning",
				title:
					"Password  should be between 7 to 16 characters \nShould contain only CHARACTERS,NUMERIC DIGITS, UNDERSCORE \n  First Character must be a LETTER",
			});
			return;
		}
		if (password !== confpassword) {
			swal("Password Must Match", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		let formdata = new FormData();
		formdata.append("firstname", firstname);
		formdata.append("lastname", lastname);
		formdata.append("email", email);
		formdata.append("password", password);

		const res = await axios.post(
			"http://localhost:8000/api/register",
			formdata
		);
		console.log("this is the value of status", res.data);
		if (res.data.status === "saved") {
			await swal({
				icon: "success",
				title: "Account Created Successfully \n Now You Can Login ",
			});
			navigate("/login");
		} else if (res.data.status === "exists") {
			await swal({
				icon: "error",
				title: "Account Already Exists",
			});
		} else {
			await swal({
				icon: "error",
				title: "Error Occured",
			});
		}
		//console.log('this is end of the funciton ....')
	}

	return (
		<>
			<LoginSvg />
			<center>
				<div className="signupbody">
					<div className="main">
						<div className="signup">
							<Card
								elevation={10}
								sx={{
									minWidth: 250,
									display: "flex",
									justifyContent: "center",
									borderRadius: 2,
									padding: 4,
								}}
							>
								<form>
									<label aria-hidden="true">Sign up</label>
									<br />
									<br />

									<TextField
										label="FirstName"
										style={{ width: "250px", margin: 5 }}
										type="text"
										onChange={(e) => setFirstName(e.target.value)}
										name="firstname"
										placeholder="FirstName"
										required
										autoComplete="off"
										value={firstname}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
									<br />
									<TextField
										label="LastName"
										style={{ width: "250px", margin: 5 }}
										type="text"
										onChange={(e) => setLastName(e.target.value)}
										name="lastname"
										placeholder="LastName"
										required
										autoComplete="off"
										value={lastname}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
									<br />

									<TextField
										label="Email"
										style={{ width: "250px", margin: 5 }}
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										name="email"
										placeholder="Email"
										required
										autoComplete="off"
										value={email}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
									<br />

									<TextField
										label="Password"
										style={{ width: "250px", margin: 5 }}
										type="password"
										onChange={(e) => setPassword(e.target.value)}
										name="pswd"
										placeholder="Password"
										required
										autoComplete="off"
										value={password}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
									<br />

									<TextField
										label="ConfirmPassword"
										style={{ width: "250px", margin: 5 }}
										type="password"
										onChange={(e) => setConfPassword(e.target.value)}
										name="cpswd"
										placeholder="Confirm Password"
										required
										autoComplete="off"
										value={confpassword}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
									<br />

									<Button
										type="submit"
										style={{ margin: 10 }}
										variant="contained"
										color="secondary"
										onClick={signUp}
									>
										<span style={{ fontSize: "20px" }}>SignUp</span>
									</Button>
								</form>
							</Card>
						</div>
					</div>
				</div>
			</center>
		</>
	);
}
