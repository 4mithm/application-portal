import React, { useState, useEffect } from "react";
import axios from "axios";
import MyModal from "./mymodal";
import { Watch } from "react-loader-spinner";
import swal from "sweetalert";
import { TableBody, TableHead, Table } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./adminstyle";
import Button from "@mui/material/Button";

export default function Notify(props) {
	let [data, setData] = useState();
	let [text, setText] = useState();
	//let [checkSelectAll, setSelectAll] = useState(false);
	const [Open, setOpen] = useState(false);
	useEffect(() => {
		fetchdata();
	}, []);

	async function fetchdata() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/getall",fm);
		result = Array.from(result.data);
		console.log(result);
		setData(result);
	}
	function handleChange(e) {
		const { id, checked } = e.target;

		// for ( let i in y){
		//     console.log(y[i].isChecked)
		// }
		if (id === "selectall") {
			const temp = data.map((user) => ({ ...user, isChecked: checked }));
			setData(temp);
		} else {
			const temp = data.map((user) => {
				return user.rid === parseInt(id)
					? { ...user, isChecked: checked }
					: user;
			});
			setData(temp);
		}
	}
	async function write() {
		let sendingid = "";
		if (!data.filter((user) => user?.isChecked !== true).length) {
			sendingid = "All";
		} else {
			sendingid = data.map((item) => {
				if (item?.isChecked === true) return item.rid;
			});
			sendingid = sendingid.filter((element) => element !== undefined);
		}
		if (sendingid == "") {
			console.log("null in sending data");
			await swal({
				icon: "warning",
				title: "Select Atleast one Student.. ",
			});
			return;
		}
		await swal("Write  The Response :", {
			content: "input",
		}).then((value) => {
			if (value) {
				submit(value, sendingid);
			}
		});
	}
	async function submit(value, sendingid) {
		console.log(sendingid.toString());

		console.log(text);
		let formdata = new FormData();
		formdata.append("id", sendingid);
		formdata.append("message", value);
	
		formdata.append('token',props.token)
		let result = await axios.post("http://127.0.0.1:8000/api/notify", formdata);
		console.log(result.data);
		if (result.data.status === "saved") {
			await swal({
				icon: "success",
				title: "Notified  ",
			});
		}
	}
	return (
		<div className="adminAppli">
			<>
				<center>
					{!data ? (
						<div className="loaderoverlay">
							<Watch color="#FFFFFF" height={110} width={110} />
						</div>
					) : data[0].rid == null ? (
						<span>nodata</span>
					) : (
						<span
							style={{
								display: "flex",
							}}
						>
							<Table>
								<TableHead>
									
								<StyledTableRow>
										<StyledTableCell sx={{background:0}}>
											<span style={{ float: "right" }}>
												<Button
													variant="contained"
													color="success"
													onClick={write}
													style={{ margin: 10 }}
												>
													<span style={{ fontSize: 15 }}>Write</span>
												</Button>
											</span>
										</StyledTableCell>
									</StyledTableRow>
									<StyledTableRow>
										<StyledTableCell>SLNO</StyledTableCell>

										<StyledTableCell>
											<input
												type={"checkbox"}
												id="selectall"
												onChange={handleChange}
												checked={
													!data.filter((user) => user?.isChecked !== true)
														.length
												}
											/>
											<span style={{ fontSize: "15px" }}>SelectAll</span>
										</StyledTableCell>

										<StyledTableCell>ID</StyledTableCell>

										<StyledTableCell>FIRSTNAME</StyledTableCell>
										<StyledTableCell>LASTNAME</StyledTableCell>
										<StyledTableCell>EMAIL</StyledTableCell>
										<StyledTableCell>VIEWMORE</StyledTableCell>
									</StyledTableRow>
								</TableHead>
								<TableBody>
									{data.map((item, count) => (
										<StyledTableRow key={item.rid}>
											<StyledTableCell>{++count}</StyledTableCell>

											<StyledTableCell>
												<input
													type={"checkbox"}
													id={item.rid}
													onChange={handleChange}
													checked={item?.isChecked || false}
												/>
											</StyledTableCell>
											<StyledTableCell>{item.rid}</StyledTableCell>
											<StyledTableCell>{item.firstname}</StyledTableCell>
											<StyledTableCell>{item.lastname}</StyledTableCell>
											<StyledTableCell>{item.email}</StyledTableCell>

											<StyledTableCell>
												<button
													className="viewmore"
													onClick={() => setOpen([true, item.rid])}
												>
													Viewmore
												</button>
											</StyledTableCell>
											<StyledTableCell>{item.status}</StyledTableCell>
										</StyledTableRow>
									))}

								</TableBody>
							</Table>
						</span>
					)}
				</center>
				{Open ? <MyModal open={Open} onClose={() => setOpen(false)} token={props.token}/> : <></>}
			</>
		</div>
	);
}
