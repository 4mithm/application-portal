/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import "./adminnav.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Watch } from "react-loader-spinner";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, StyledTableRow } from "./adminstyle";
import MyModal from "./mymodal";

import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	Paper,
} from "@mui/material";

export default function MangageRegister(props) {
	const [data, setData] = useState("");
	const [loader, setLoader] = useState(false);
	const [Open, setOpen] = useState(false);

	useEffect(() => {
		fetchdata();
	}, []);
	//-----------------------------------------------------------------------------------------------

	//-----------------------------------------------------------------------------------
	async function fetchdata() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/getall",fm);
		
		setData(result.data);
		setLoader(false);
	}

	async function deleteCall(id) {
		let fm = new FormData();
		fm.append('id',id)
		fm.append('token',props.token)
		let res = await axios.post("http://localhost:8000/api/delreg", fm);
		if (res.data.status == "deleted") {
			fetchdata();
			swal({
				icon: "success",
				title: "Deleted..... ",
			});
		}
	}
	async function regdel(id) {
		const res = "";
		await swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover ",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteCall(id);
				setLoader(true);
			} else {
				setLoader(false);
			}
		});

		console.log("regdel called .....");
	}
	return (
		<div>
			<center>
				{!data || loader ? (
					<div className="loaderoverlay">
						<Watch color="#00BFFF" height={110} width={110} />
					</div>
				) : (
					<></>
				)}
				{data && data[0].rid == null ? (//here you have put !data that's it ......
					<h1 className="nodata">no Data</h1>
				) : (
					<></>
				)}
				{data && data[0].rid !== null ? (
					<TableContainer
						// component={Paper}
						sx={{ maxHeight: "100vh" }}
					>
						<Table sx={{ maxWidth: "100%" }}>
							<TableHead>
								<StyledTableRow>
									<StyledTableCell>SLNO</StyledTableCell>

									<StyledTableCell>ID</StyledTableCell>
									<StyledTableCell>FIRSTNAME</StyledTableCell>
									<StyledTableCell>LASTNAME</StyledTableCell>
									<StyledTableCell>EMAIL </StyledTableCell>
									<StyledTableCell>VIEWMORE</StyledTableCell>
									<StyledTableCell>DELETE</StyledTableCell>
								</StyledTableRow>
							</TableHead>
							<TableBody>
								{data.map((item, count) => (
									<StyledTableRow key={item.rid}>
										<StyledTableCell>{++count}</StyledTableCell>
										<StyledTableCell>{item.rid}</StyledTableCell>
										<StyledTableCell>{item.firstname}</StyledTableCell>
										<StyledTableCell>{item.lastname}</StyledTableCell>
										<StyledTableCell>{item.email} </StyledTableCell>
										<StyledTableCell>
											<Button
												variant="text"
												onClick={() => setOpen([true, item.rid])}
											>
												Viewmore
											</Button>
										</StyledTableCell>
										<StyledTableCell>
											<Button
												variant="outlined"
												color="error"
												startIcon={<DeleteIcon />}
												onClick={() => regdel(item.rid)}
											>
												<span style={{ fontSize: 15 }}>Delete</span>
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<></>
				)}
			</center>
			{Open ? <MyModal open={Open} onClose={() => setOpen(false)} token={props.token} /> : <></>}
		</div>
	);
}
