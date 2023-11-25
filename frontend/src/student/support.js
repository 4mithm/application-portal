import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Watch } from "react-loader-spinner";
import swal from "sweetalert";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
window.scrollTo(0, document.body.scrollHeight);

export default function Support(props) {
	let [data, setData] = useState();
	let [request, setRequest] = useState();
	let fm = new FormData();
	useEffect(() => {
		supportwid();
	}, []);
	async function supportwid() {
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/supportwid", fm);
		setData(result.data.result);
	}

	async function sendrequest() {
		fm.append("request", request);
		fm.append('token',props.token)
		const [cookieName, cookievalue] = document.cookie.split("=");
		fm.append(cookieName, cookievalue);
		let result = await axios.post("http://localhost:8000/api/sendrequest", fm);
		if(result)
		await swal({
			icon: "success",
			title: "Request Sent ",
		});
		setData(result.data.result);
	}

	return (
		<div>
			<center>
				<div>
					{!data ? (
						<div className="loaderoverlay">
							<Watch color="#00BFFF" height={110} width={110} />
						</div>
					) : data == "empty" ? (
						<h1 className="nodata"></h1>
					) : (
						<>
							<section className="chatbox">
								<section className="chat-window">
									{data.map((item) => (
										<>
											{item.response ? (
												<article
													className="msg-container msg-remote"
													id="msg-0"
												>
													<div className="msg-box">
														<img
															className="user-img"
															id="user-0"
															src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
														/>
														<div className="flr">
															<div className="messages">
																<p className="msg" id="msg-0">
																	{item.response}
																</p>
															</div>
															<span className="timestamp">
																<span className="username">Admin</span>&bull;
															</span>
														</div>
													</div>
												</article>
											) : (
												<></>
											)}

											<article className="msg-container msg-self" id="msg-0">
												<div className="msg-box">
													<img
														className="user-img"
														id="user-0"
														src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
													/>
													<div className="flr">
														<div className="messages">
															<p className="msg" id="msg-0">
																{item.request}
															</p>
														</div>
														<span className="timestamp">
															<span className="username">You</span>&bull;
														</span>
													</div>
												</div>
											</article>
										</>
									))}
								</section>
							</section>
							
						</>
					)}
				</div>
				<input
								type="text"
								className="mymsginput"
								onChange={(e) => setRequest(e.target.value)}
							></input>
							<Button
								variant="contained"
								onClick={sendrequest}
								endIcon={<SendIcon />}
							>
								<span style={{ fontSize: 20 }}>Send</span>
							</Button>
			</center>
		</div>
	);
}
