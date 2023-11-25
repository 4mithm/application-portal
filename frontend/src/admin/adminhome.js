import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
export default function AdminHome(props) {
	let [data, setData] = useState("");
	useEffect(() => {
		getInfo();
	}, []);
	async function getInfo() {
		let fm = new FormData();
		fm.append("token", props.token);
		let result = await axios.post("http://localhost:8000/api/adminhome", fm);
		result = Object.entries(result.data);
		console.log(result);
		setData(result);
	}
	return (
		<div style={{ display: "flex" }}>
			<Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{data?data.map(item=>(
					<Grid item xs={3} key={item[0]}>
					<Card key={1} elevation={20} sx={{ minHeight: 100 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: 30, fontFamily: "Poppins" }}
								color="text.primary"
								gutterBottom
							>
							{item[0]}
							</Typography>

							<Typography
								sx={{
									fontSize: 80,
									fontFamily: "Poppins",
									paddingLeft: "50%",
								}}
								color="text.secondary"
								gutterBottom
							>
								{item[1]}
							</Typography>
						</CardContent>
					</Card>
				</Grid>



				)):<></>}
				
			</Grid>
		</div>
	);
}
