/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./student.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import Button from "@mui/material/Button";
// import Banner from "../portal/components/Banner";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./_header.css";
Modal.setAppElement("#root");

export default function StudentNav(props) {
	let navi = useNavigate();
	let [open, setOpen] = useState(false);
	const [data, setData] = useState({});
	let [firstname, setFirstName] = useState("");
	let [lastname, setLastName] = useState("");
	let [password, setPassword] = useState("");
	{
		/* ----------------------------------------------------------------------------------------------------------------------------- */
	}

	useEffect(() => {
		getEditProfile();
	}, []);
	async function getEditProfile() {
		let fm = new FormData();
		fm.append("token", props.token);
		const res = await axios.post("http://127.0.0.1:8000/api/getname", fm);
		let mydata = res.data.result;
		setFirstName(mydata.firstname);
		setLastName(mydata.lastname);
	}
	console.log(firstname);
	console.log(lastname);
	console.log(password);
	async function editName() {
		if (firstname.trim() === "") {
			await swal({
				icon: "warning",
				title: "FirstName Cannot be Empty",
			});
			return;
		}
		if (lastname.trim() === "") {
			await swal({
				icon: "warning",
				title: "LastName Cannot be Empty",
			});
			return;
		}

		let fm = new FormData();
		fm.append("firstname", firstname);
		fm.append("lastname", lastname);
		fm.append("token", props.token);
		const res = await axios.post("http://127.0.0.1:8000/api/setname", fm);
		if (res.data.status === "infosaved") {
			await swal({
				icon: "success",
				title: "Saved Successfully ...",
			});
		}
	}
	async function changepassword() {
		if (password.trim() === "") {
			await swal({
				icon: "warning",
				title: "Password Cannot be Empty",
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

		let fm = new FormData();
		fm.append("password", password);
		fm.append("token", props.token);

		const res = await axios.post(
			"http://127.0.0.1:8000/api/changepassword",
			fm
		);
		if (res.data.status === "infosaved") {
			await swal({
				icon: "success",
				title: "Saved Successfully ...",
			});
		}
	}

	return (
		<>
			<header className="default-header">
				<nav className="navbar navbar-expand-lg  navbar-light">
					<div className="container">
						<a className="navbar-brand" href="">
							<img src="img/logo.jpg" width="50px" alt="" />
						</a>{" "}
					</div>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="lnr lnr-menu"></span>
					</button>

					<div
						className="collapse navbar-collapse justify-content-end align-items-center"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav">
							<li>
								<Link className="link" to="">
									Home
								</Link>
							</li>
							<li>
								<Link className="link" to="form ">
									apply
								</Link>
							</li>
							<li>
								<Link className="link" to="view">
									View
								</Link>
							</li>
							<li>
								<Link className="link" to="status">
									Status
								</Link>
							</li>
							<li>
								<Link className="link" to="editform">
									EditForm
								</Link>
							</li>
							<li>
								<Link className="link" to="notification">
									Notification
								</Link>
							</li>
							<li>
								<Link className="link" to="support">
									Support
								</Link>
							</li>
							<li>
								<Link className="link" to="feedback">
									Feedback
								</Link>
							</li>
							<li>
								<Link to="#" onClick={() => setOpen(true)}>
									EditProfile
								</Link>
							</li>
							<li>
								<Link
									to="#"
									onClick={async () => {
										let fm = new FormData();
										fm.append("token", props.token);
										await axios.post("http://localhost:8000/api/sessionend",fm);
										navi("/");
									}}
								>
									
									LOGOUT{""}
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>

			{/* ----------------------------------------------------------------------------------------------------------------------------- */}
			<Modal
				className="modalpack"
				isOpen={open}
				onRequestClose={() => setOpen(false)}
				style={{
					content: {
						backgroundColor: "white",

						padding: "10px",
						borderRadius: "1%",
						fontFamily: "Poppins",
						fontSize: "20px",
						minWidth: "400px",
						width: "400px",
						height: "600px",
						margin: "40px",
						marginTop: "150px",
					},
					overlay: {
						backgroundColor: " rgb(161, 160, 160,0.2)",
						display: "flex",
						justifyContent: "end",
						alignItems: "start",
					},
				}}
			>
				<div
					className="modalheading"
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<button
						style={{ height: 30, width: 30, margin: 10 }}
						onClick={() => setOpen(false)}
					>
						&times;
					</button>
				</div>
				<br />
				<br />
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "70%",
					}}
				>
					<div>
						<table>
							<tbody>
								<tr>
									<td>
										<span style={{ fontSize: "20px" }}>Edit Name</span>
									</td>
								</tr>
								<tr>
									<td>
										<TextField
											label="FirstName"
											variant="outlined"
											color="secondary"
											type={"text"}
											required
											placeholder="FirstName"
											onChange={(e) => setFirstName(e.target.value)}
											style={{ width: "250px", margin: 10 }}
											autoComplete="off"
											value={firstname}
										/>
									</td>
								</tr>

								<tr>
									<td>
										<TextField
											label="LastName"
											variant="outlined"
											color="secondary"
											type={"text"}
											required
											placeholder="LastName"
											onChange={(e) => setLastName(e.target.value)}
											style={{ width: "250px", margin: 10 }}
											autoComplete="off"
											value={lastname}
										/>
									</td>
								</tr>
								<tr>
									<td>
										<Button
											onClick={editName}
											variant="contained"
											color="secondary"
											style={{ margin: 10 }}
										>
											<span style={{ fontSize: 10, fontFamily: "Poppins" }}>
												SAVE
											</span>
										</Button>
									</td>
								</tr>
							</tbody>
						</table>
						<br />
						<br />
						<table>
							<tbody>
								<tr>
									<td>
										<span style={{ fontSize: "20px" }}>Change Password</span>
									</td>
								</tr>
								<tr>
									<td>
										<TextField
											label="Password"
											autoComplete="off"
											variant="outlined"
											color="secondary"
											type="password"
											name="pswd"
											style={{ width: "250px", margin: 10 }}
											onChange={(e) => setPassword(e.target.value)}

											// onChange={(e) => setPassword(e.target.value)}
										/>
									</td>
								</tr>
								<tr>
									<td>
										<Button
											onClick={changepassword}
											variant="contained"
											style={{ margin: 10 }}
										>
											<span style={{ fontSize: 10, fontFamily: "Poppins" }}>
												SAVE
											</span>
										</Button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Modal>
		</>
	);
}
