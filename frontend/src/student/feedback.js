import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import swal from "sweetalert";
import { Watch } from "react-loader-spinner";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

export default function Feedback(props) {
	useEffect(() => {
		feedBackCheck();
	}, []);
	let [data, setData] = useState(false);
	let [rate, setRate] = useState(0);
	let [text, setText] = useState("");
	let [load, setLoader] = useState(true);
	async function feedBackCheck() {
		let fm = new FormData();
		fm.append('token',props.token)
		let res = await axios.post("http://localhost:8000/api/feedbackcheck", fm);
		console.log(res);
		if (res.data.status === true) setData(true);//your can add tiple = 
		else setData(false);
		setLoader(false);
	}
	function ratingchanged(newrate) {
		setRate(newrate);
	}
	async function submitFeedback() {
		console.log("this is submit function ");
		if (!rate) {
			await swal("Rate Us", {
				buttons: false,
				timer: 500,
				icon: "warning",
			});
			return;
		}
		if (text == "") {
			await swal("Write a Feedback..", {
				buttons: false,
				timer: 500,
				icon: "warning",
			});
			return;
		}
		setLoader(true);
		let fm = new FormData();
		fm.append("rating", rate);
		fm.append("feedback", text);
		fm.append('token',props.token)
		let res = await axios.post("http://localhost:8000/api/feedback", fm);
		setLoader(false);
		console.log(res);
		feedBackCheck();
	}
	if (load)
		return (
			<div className="loaderoverlay">
				<Watch color="#00BFFF" height={110} width={110} />
			</div>
		);
	return (
		<>
			{data ? (
				<strong className="studfeedback">Feedback Sent </strong>
			) : (
				<div className="studfeedback">
					<div
						style={{
							display: "inline",
							margin: "40px",
						}}
					>
						<h1 style={{ fontFamily: "Poppins", fontSize: "25px" }}>RateUs</h1>
						<br />

					
						<ReactStars
							count={10}
							size={30}
							onChange={ratingchanged}
							value={0}
							half={true}
						/>

					

						<br />
						<h1 style={{ fontFamily: "Poppins", fontSize: "25px" }}>
							Feedback
						</h1>
						<br />


						<TextField
							id="outlined-multiline-flexible"
							label="Feedback"
							minRows={6}
							maxRows={10}
							InputLabelProps={{ style: { fontSize: 20 } }}
							InputProps={{
								style: {
									fontSize: 17,
									fontFamily: "Poppins",
									width: "500px",
								},
							}}
							multiline
							onChange={(e) => setText(e.target.value)}
							variant="outlined"
						/>

						<br />
						<br />

						<Button
							variant="contained"
							onClick={submitFeedback}
							endIcon={<SendIcon />}
						>
							<span style={{ fontSize: 20 }}>Send</span>
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
