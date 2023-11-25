import axios from "axios";
import React, { useState, useEffect } from "react";
import "./adminnav.css";
import MyModal from "./mymodal";
import swal from "sweetalert";
import { Watch } from "react-loader-spinner";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "./adminstyle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
} from "@mui/material";
let arr = [];

export default function ManageApplication(props) {
	const [data, setData] = useState("");
	const [Open, setOpen] = useState(false);
	const map = {};
	const newArray = [];
	//-----------------------------------------------------------------------------------------------
	//https://www.tutorialspoint.com/remove-duplicates-from-a-array-of-objects-javascript
	arr.forEach((el) => {
		if (!map[JSON.stringify(el)]) {
			map[JSON.stringify(el)] = true;
			newArray.push(el);
		}
	});
	arr = newArray;
	//-----------------------------------------------------------------------------------------------

	useEffect(() => {
		fetchdata();
	}, []);

	//--------------------------------------------------------------------------------------------
	async function fetchdata() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post(
			" http://localhost:8000/api/getAllApplication",fm
		);
		result = Array.from(result.data);
		console.log(result);
		setData(result);
	}
	//--------------------------------------------------------------------------------------------

	async function accept(id) {
		const searchObject = arr.find((item) => item.rid == id);
		if (searchObject === undefined) {
			await swal("Select the Course", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});

			return;
		}

		let formdata = new FormData();
		formdata.append("id", id);
		formdata.append("course", searchObject.course);
	
		formdata.append('token',props.token)

		let result = await axios.post("http://localhost:8000/api/accept", formdata);
		if (result.data.status == "accepted") {
			fetchdata();
			await swal({
				icon: "success",
				title: "Accepted.... ",
			});
		}
	}
	//--------------------------------------------------------------------------------------------

	async function reject(id) {
		let formdata = new FormData();
		formdata.append("id", id);
	
		formdata.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/reject", formdata);
		if (result.data.status == "rejected") {
			fetchdata();
			await swal({
				icon: "success",
				title: "Rejected..... ",
			});
		}
	}
	//--------------------------------------------------------------------------------------------

	function courseChange(e) {
		let x = e.target.value;
		let y = e.target.name;
		console.log(x);
		console.log(y);
		console.log(arr);
		let inty = parseInt(y);
		arr = arr.filter(function (el) {
			return el.rid != inty;
		});
		arr.push({ rid: parseInt(y), course: x });
		console.log("after array --------------------------------------\n");
		console.log(arr);
	}
	//--------------------------------------------------------------------------------------------

	return (
		<>
			<center>
				<div>
					{!data ? (
						<div className="loaderoverlay">
							<Watch color="#FFFFFF" height={110} width={110} />
						</div>
					) : data[0].rid == null ? (
						<h1 className="nodata">no Data</h1>
					) : (
						<>
							<TableContainer
								// component={Paper}
								sx={{ maxHeight: "100vh", margin: "20" }}
							>
								<Table>
									<TableHead>
										<TableRow>
											<StyledTableCell>Slno</StyledTableCell>

											<StyledTableCell>Id</StyledTableCell>
											<StyledTableCell>Appid</StyledTableCell>
											<StyledTableCell>Name</StyledTableCell>
											<StyledTableCell>Email</StyledTableCell>
											<StyledTableCell>Course</StyledTableCell>
											<StyledTableCell>Viewmore</StyledTableCell>
											<StyledTableCell>Status</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data.map((item, count) => (
											<StyledTableRow key={item.rid}>
												<StyledTableCell>{++count}</StyledTableCell>

												<StyledTableCell>{item.rid}</StyledTableCell>
												<StyledTableCell>{item.aid}</StyledTableCell>
												<StyledTableCell>{item.firstname}</StyledTableCell>
												<StyledTableCell>{item.email}</StyledTableCell>
												<StyledTableCell>
													{item.status === "pending" ? (
														item.course.split(",").length > 1 ? (
															<>
																<InputLabel id="demo-simple-select-label">
																	Course
																</InputLabel>
																<Select
																	labelId="demo-simple-select-label"
																	name={item.rid.toString()}
																	label="Course"
																	style={{ width: "200px" }}
																	onChange={courseChange}
																>
																	{item.course.split(",").map((x) => (
																		<MenuItem  key={x} value={x}>{x}</MenuItem>
																	))}
																</Select>
															</>
														) : (
															item.course
														)
													) : (
														item.course
													)}
												</StyledTableCell>

												<StyledTableCell>
													<Button
														variant="text"
														onClick={() => setOpen([true, item.rid])}
													>
														Viewmore
													</Button>
												</StyledTableCell>
												<StyledTableCell>
													<span style={{ fontSize: 18 }}>
														{(() => {
															if (item.status === "pending")
																return (
																	<>
																		{(() => {
																			item.course.split(",").length === 1 ? (
																				arr.push({
																					rid: item.rid,
																					course: item.course,
																				})
																			) : (
																				<></>
																			);
																		})()}
																		<Button
																			variant="contained"
																			color="success"
																			onClick={() => accept(item.rid)}
																			style={{ margin: 10 }}
																		>
																			<span style={{ fontSize: 15 }}>
																				Accept
																			</span>
																		</Button>
																		<Button
																			variant="outlined"
																			color="error"
																			onClick={() => reject(item.rid)}
																			style={{ margin: 10 }}
																		>
																			<span style={{ fontSize: 15 }}>
																				Reject
																			</span>
																		</Button>
																	</>
																);
															else if (item.status === "accepted")
																return "Accepted";
															else if (item.status === "rejected")
																return "Rejected";
														})()}
													</span>
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</>
					)}
				</div>
			</center>
			{Open ? <MyModal open={Open} onClose={() => setOpen(false)} token={props.token} /> : <></>}
		</>
	);
}
