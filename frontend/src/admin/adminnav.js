/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import "./adminnav.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function AdminNav(props) {
	
	let navi = useNavigate();


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
								<Link className="link" to="register">
									Registrations
								</Link>
							</li>
							<li>
								<div className="dropdown">
								<li><Link className="link" to="#">
								Applications
								</Link></li>
									<button className="dropbtn"> </button>
									<div className="dropdown-content">
										<Link className="link" to="application">
											ViewAll
										</Link>
										<Link className="link" to="accepted">
											Accepted
										</Link>
										<Link className="link" to="rejected">
											Rejected
										</Link>
									</div>
								</div>
							</li>
							<li>
								<Link className="adminlink" to="search">
									Search
								</Link>
							</li>
							<li>
								<div className="dropdown">
								<li><Link className="link" to="#">
								Notifications
								</Link></li>
									<div className="dropdown-content">
										<Link className="adminlink" to="notify">
											Notify
										</Link>
										<Link className="adminlink" to="viewnotifies">
											View
										</Link>
									</div>
								</div>
							</li>
							<li>
								<div className="dropdown">
								<li><Link className="link" to="#">
								Courses
								</Link></li>
									<div className="dropdown-content">
										<Link className="adminlink" to="addcourse">
											Add
										</Link>
										<Link className="adminlink" to="deletecourse">
											View
										</Link>
									</div>
								</div>
							</li>
							<li>
								<Link className="adminlink" to="feedbacks">
									Feedbacks
								</Link>
							</li>
							<li>
								<Link className="adminlink" to="support">
									Support
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
									{" "}
									LOGOUT{" "}
								</Link>
							</li>
							
						</ul>
					</div>
				</nav>
			</header>
		
		</>
	);
}
