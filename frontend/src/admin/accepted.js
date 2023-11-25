import axios from "axios";
import MyModal from "./mymodal";
import { Watch } from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { TableBody, TableHead, Table } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./adminstyle";
import Button from "@mui/material/Button";

export default function Accepted(props) {
	let [data, setData] = useState("");
	const [Open, setOpen] = useState(false);
	useEffect(() => {
		fetchdata();
	}, []);

	async function fetchdata() {
		let fm = new FormData();
		fm.append('token',props.token)
		let result = await axios.post("http://localhost:8000/api/accepted",fm);

		setData(result.data);
	}
	return (
		<>
			<div>
				<center>
					{!data ? (
						<div className="loaderoverlay">
							<Watch color="#00BFFF" height={110} widStyledTableCell={110} />
						</div>
					) : data[0].rid == null ? (
						<span className="nodata">no Data</span>
					) : (
						<Table>
							<TableHead>
								<StyledTableRow>
									<StyledTableCell>SLNO</StyledTableCell>

									<StyledTableCell>ID</StyledTableCell>
									<StyledTableCell>APPID</StyledTableCell>
									<StyledTableCell>NAME</StyledTableCell>
									<StyledTableCell>EMAIL</StyledTableCell>
									<StyledTableCell>COURSE</StyledTableCell>
									<StyledTableCell>VIEWMORE</StyledTableCell>
									<StyledTableCell>STATUS</StyledTableCell>
								</StyledTableRow>
							</TableHead>
							<TableBody>
								{data.map((item, count) => (
									<StyledTableRow key={item.rid}>
										<StyledTableCell>{++count}</StyledTableCell>
										<StyledTableCell>{item.rid}</StyledTableCell>
										<StyledTableCell>{item.aid}</StyledTableCell>
										<StyledTableCell>{item.firstname}</StyledTableCell>
										<StyledTableCell>{item.email}</StyledTableCell>
										<StyledTableCell>{item.course}</StyledTableCell>
										<StyledTableCell>
											<Button
												variant="text"
												onClick={() => setOpen([true, item.rid])}
											>
												Viewmore
											</Button>
										</StyledTableCell>
										<StyledTableCell>{item.status}</StyledTableCell>-
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					)}
				</center>
			</div>
			{Open ? <MyModal open={Open} onClose={() => setOpen(false)} token={props.token}/> : <></>}
		</>
	);
}
