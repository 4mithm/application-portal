/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
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
								<Link className="link" to="/">
									About
								</Link>
							</li>
							<li>
								<Link className="link" to="/signup">
									SignUp
								</Link>
							</li>
							<li>
								<Link className="link" to="/login">
									Login
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		</>
	);
}
