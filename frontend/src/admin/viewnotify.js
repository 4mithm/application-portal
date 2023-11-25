import React, { useState, useEffect } from "react";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
export default function ViewNotifies(props) {
	const [alldata, setAllData] = useState("");
	const [specdata, setspecData] = useState("");

	useEffect(() => {
		fetchdata();
	}, []);

	async function fetchdata() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/getallnotify",fm);
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
	async function delfromall(id){
		let fm = new FormData();
		fm.append('id',id)
	
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/delfromnotifyall",fm);
		fetchdata();
	}
	async function delfromone(id){
		let fm = new FormData();
		fm.append('id',id)
	
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/delfromnotifyone",fm);
		fetchdata();
	}
	let count=1;
	return (
		<div>
			{!specdata && !alldata ? (
				<div className="loaderoverlay">
					<Watch color="#FFFFFF" height={110} width={110} />
				</div>
			) : alldata == "nodata" && specdata == "nodata" ? (
				<strong>No data ....</strong>
			) : (
				<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{alldata ? (
						alldata.map((item) => (
							<Grid item xs={4}>
								<Card
									key={item.id}
									elevation={20}
									sx={{ minWidth: 400, wordBreak: "break-word" }}
								>
									<CardContent>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<Typography
												sx={{ fontSize: 15, fontFamily: "Poppins" }}
												color="text.primary"
												gutterBottom
											>
												<span style={{ marginRight: 10 }}>{count++}.</span>
												all
											</Typography>
											<Typography>
												<IconButton aria-label="delete" size="large">
													<DeleteIcon
														fontSize="inherit"
														 onClick={() =>delfromall(item.id)}
													/>
												</IconButton>
											</Typography>
										</div>
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
						specdata.map((item) => (
							<Grid item xs={4}>
								<Card
									key={item.rid}
									elevation={20}
									sx={{ minWidth: 400, wordBreak: "break-word" }}
								>
									<CardContent>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<Typography
												sx={{ fontSize: 15, fontFamily: "Poppins" }}
												color="text.primary"
												gutterBottom
											>
												<span style={{ marginRight: 10 }}>{count++}.</span>
												{item.rid}
											</Typography>
											<Typography>
												<IconButton aria-label="delete" size="large">
													<DeleteIcon
														fontSize="inherit"
														onClick={() =>delfromone(item.id)}
													/>
												</IconButton>
											</Typography>
										</div>
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
				</Grid>
			)}
		</div>
	);
}
