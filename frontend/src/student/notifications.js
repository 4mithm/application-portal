import React, { useState, useEffect } from "react";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";



export default function ViewNotifies(props) {
	const [alldata, setAllData] = useState("");
	const [specdata, setspecData] = useState("");
	let notificationcount=0;
	let cardstyle = {
		/* Created with https://www.css-gradient.com */
		background: "#ADFFDE",
		background: "-webkit-linear-gradient(top left, #ADFFDE, #98F49D)",
		background: "-moz-linear-gradient(top left, #ADFFDE, #98F49D)",
		background: "linear-gradient(to bottom right, #ADFFDE, #98F49D)",
		minWidth: 400,
		minHeight: 200,
		wordBreak: "break-all",
	};

	useEffect(() => {
		fetchdata();
	}, []);

	async function fetchdata() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post(
			"http://localhost:8000/api/notifications	",
			fm
		);
		if (result.data?.status == "nodata") {
			setAllData("nodata");
			setspecData("nodata");
		}
		//result = Array.from(result.data);
		//console.log(result.data.all)
		// console.log(result.data.specific)
		//console.log(Array.from(result.data.all))
		setAllData(Array.from(result.data.all));
		setspecData(Array.from(result.data.specific));
	}

	return (
		<div>
			{!specdata && !alldata ? (
				<div className="loaderoverlay">
					<Watch color="#FFFFFF" height={110} width={110} />
				</div>
			) : alldata == "nodata" && specdata == "nodata" ? (
				<strong>No data ....</strong>
			) : (
				<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
					{alldata ? (
						alldata.map((item) => (
							<Grid item xs={4}>
								<Card key={item.id} elevation={20} sx={cardstyle}>
									<CardContent>
										<Typography
											sx={{ fontSize: 15, fontFamily: "Poppins" }}
											color="text.primary"
											gutterBottom
										>
											<span style={{ marginRight: 10 }}>{++notificationcount}.</span>
											{item.updated_at}
										</Typography>
										<Typography
											sx={{ fontSize: 15, fontFamily: "Poppins" }}
											color="text.primary"
											gutterBottom
										>
											<td>{item.message}</td>
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))
					) : (
						<></>
					)}

					{specdata ? (
						specdata.map((item, count = 1) => (
							<Grid item xs={4}>
								<Card
									key={item.id}
									elevation={20}
									sx={cardstyle}
								>
									<CardContent>
										<Typography
											sx={{ fontSize: 15, fontFamily: "Poppins" }}
											color="text.primary"
											gutterBottom
										>
											<span style={{ marginRight: 10 }}>{++notificationcount}.</span>
											{item.updated_at}
										</Typography>
										<Typography
											sx={{ fontSize: 15, fontFamily: "Poppins" }}
											color="text.primary"
											gutterBottom
										>
											{item.message}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))
					) : (
						<></>
					)}
				</Grid>
			)}
		</div>
	);
}
