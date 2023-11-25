import React, { useState, useEffect } from "react";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
export default function StudHome(props) {
	console.log(props.token)
	let [course, setCourse] = useState("");

	let cardstyle = {
		/* Created with https://www.css-gradient.com */
		background: "#A9BFE8",
		background: "-webkit-linear-gradient(top left, #A9BFE8, #2DA5E0)",
		background: "-moz-linear-gradient(top left, #A9BFE8, #2DA5E0)",
		background: " linear-gradient(to bottom right, #A9BFE8, #2DA5E0)",
		minWidth: "400px",
	};
	useEffect(() => {
		getAllCourse();
	}, []);
	async function getAllCourse() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post(
			"http://localhost:8000/api/getcoursewithinfo",
			fm
		);
		result = result.data;
	
		setCourse(result);
	}

	if (!course) return;
	<div className="loaderoverlay">
		<Watch color="#FFFFFF" height={110} width={110} />
	</div>;
	if (course && course.id === null) return <div>No Added Course</div>;
	return (
		<div>
			<strong className="text">Courses</strong>
			<center>
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{course.map((item, count) => (
						<Grid item xs={4}>
							<Card key={item.id} elevation={20} sx={cardstyle}>
								<CardContent>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<div>
											<Typography
												sx={{ fontSize: 15, fontFamily: "Poppins" }}
												color="text.primary"
												gutterBottom
											>
												<span style={{ marginRight: 10 }}>{++count}.</span>

												<span style={{ fontSize: 25 }}>{item.course}</span>
											</Typography>
										</div>
									</div>

									<Typography
										sx={{ fontSize: 16, fontFamily: "Poppins" }}
										color="text.secondary"
										gutterBottom
									>
										{item.description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</center>
		</div>
	);
}
