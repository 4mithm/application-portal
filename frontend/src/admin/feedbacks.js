import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import Grid from "@material-ui/core/Grid";

import { styled } from "@mui/material/styles";
import { minHeight } from "@mui/system";
import Typography from "@mui/material/Typography";

import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function Feedbacks(props) {
	let [data, setData] = useState();
	useEffect(() => {
		getFeedback();
	}, []);
	async function getFeedback() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/getallfeedback",fm);
		setData(result.data);
	}
	//------------------------------------------------------------------------------------

	return (
		<div>
			{!data ? (
				<div className="loaderoverlay">
					<Watch color="#FFFFFF" height={110} width={110} />
				</div>
			) : (
				<>
					<Grid
						container
						rowSpacing={4}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						spacing	={4}
					>
						{data ? (
							data.map((item, count) => (
								<Grid item xs={4}>
									<Card key={item.id} elevation={20} sx={{ minWidth: 400 }}>
										<CardContent>
											<Typography
												sx={{ fontSize: 15, fontFamily: "Poppins" }}
												color="text.primary"
												gutterBottom
											>
												<span style={{ marginRight: 10 }}>{++count}.</span>

												<span style={{ fontSize: 25 }}>{item.rid}</span>
											</Typography>

											<Typography
												sx={{ fontSize: 25, fontFamily: "Poppins" }}
												color="text.secondary"
												gutterBottom
											>
												Rating:&nbsp;&nbsp;&nbsp;{item.rating}<br/>
												Feedback:<br/>
											</Typography>
											<Typography
												sx={{ fontSize: 16, fontFamily: "Poppins" }}
												color="text.secondary"
												gutterBottom
											>
												{item.feedback}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))
						) : (
							<></>
						)}
					</Grid>
				</>
			)}
		</div>
	);
}
