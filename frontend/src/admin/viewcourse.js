import React, { useState, useEffect } from "react";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import swal from "sweetalert";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function ViewCourse(props) {
	let [course, setCourse] = useState();
	useEffect(() => {
		getAllCourse();
	}, []);
	async function getAllCourse() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/getcoursewithinfo",fm);
		result = result.data;
		console.log(result);
		setCourse(result);
	}
	async function courseDel(id) {
		let fm = new FormData();
		fm.append("id", id);
		
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/delcourse", fm);
		if (result.data == "deleted") {
			getAllCourse();
			swal({
				icon: "success",
				title: "Deleted..... ",
			});
		}
	}

	if (!course) return;
	<div className="loaderoverlay">
		<Watch color="#FFFFFF" height={110} width={110} />
	</div>;
	if (course && course.id === null) return <div>No Added Course</div>;
	if (course)
		return (
			<div >
				<center>
					<Grid
						container
						rowSpacing={4}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						spacing	={4}
					>
						{course.map((item,count) => (
							<Grid item xs={4}>
						
								<Card key={item.id} elevation={20}sx={{ minWidth: 400 }} >
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
											<Typography>
												<IconButton aria-label="delete" size="large">
													<DeleteIcon
														fontSize="inherit"
														onClick={() => courseDel(item.id)}
													/>
												</IconButton>
												
											</Typography>
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
