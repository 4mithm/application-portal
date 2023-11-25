import React, { useEffect } from "react";
import "./signuplogin.css";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginSvg from "./loginsignupsvg";
import { Card } from "@mui/material";

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

export default function Login() {
	

	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function logIn(e) {
		e.preventDefault();

		if (email.trim() === "") {
			await swal("Enter Email", {
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

		let item = { email, password };
		let res = "";
		try {
			res = await axios.post("http://localhost:8000/api/login", item);
			console.log(res.data);
			document.cookie = "mycookie=" + res.data.token;
		} catch (e) {
			await swal({
				icon: "error",
				title: "Server Error",
			});
			return;
		}

		if (res.data.status === "admin") {
			navigate('admin='+res.data.token);
		} else if (res.data.status === "student") {
			navigate('student='+res.data.token);
		} else if (res.data.status === "notfound") {
			await swal({
				icon: "error",
				title: "Account doesn't exists",
			});
			return;
		} else if (res.data.status === "passerror") {
			await swal({
				icon: "error",
				title: "Password Error",
			});
			return;
		}
	}

	return (
		<>
			<LoginSvg />
			<div className="loginbody">
				<div className="loginmain">
					<div className="signup">
						<center>
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
									<label aria-hidden="true">Login</label>
									<br />
									<br />
									<TextField
										label="Email"
										style={{ width: "250px", margin: 20 }}
										type="email"
										name="email"
										placeholder="Email"
										required
										autoComplete="off"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
									<br />

									<TextField
										label="Password"
										style={{ width: "250px" }}
										autoComplete="off"
										required
										type="password"
										name="pswd"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
									<br />
									<br />

									<Button
										variant="contained"
										color="success"
										type="submit"
										onClick={logIn}
										size="large"
									>
										<span style={{ fontSize: "20px" }}>Login</span>
									</Button>
								</form>
							</Card>
						</center>
					</div>
				</div>
			</div>
		</>
	);
}
