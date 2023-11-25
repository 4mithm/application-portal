import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Watch } from "react-loader-spinner";
import swal from "sweetalert";
import { TableBody, TableHead, Table } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./adminstyle";
import Button from "@mui/material/Button";
export default function AdminSupport(props) {
	let [data, seStyledTableCellata] = useState();
	let fm =new FormData();
	fm.append('token',props.token)
	useEffect(() => {
		getallsupport();
	}, []);
	async function getallsupport() {
	
			
		let result = await axios.post("http://localhost:8000/api/getallsupport",fm);
		seStyledTableCellata(result.data);
	}
	async function updatesupport(value){
		fm.append('response',value)
				let result =  await axios.post("http://localhost:8000/api/updatesupport",fm);
				seStyledTableCellata(result.data);
	}
	 async function reply(id){
		
		fm.append('id',id)
		await swal("Write  The Response :", {
			content: "input",
		  })
		  .then((value) => {
			if(value){
				updatesupport(value)
			}
		  });
		  
	}

	return (
		<center>
			<div className="adminhome">
				{!data ? (
					<div className="loaderoverlay">
						<Watch color="#00BFFF" height={110} width={110} />
					</div>
				) : data[0].rid == null ? (
					<h1 className="nodata">no Data</h1>
				) : (
					<Table >
						<TableHead>
							<StyledTableRow>
							<StyledTableCell>slno</StyledTableCell>

								<StyledTableCell>rid</StyledTableCell>
								<StyledTableCell>Request</StyledTableCell>
								<StyledTableCell>Response</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{data.map((item,count) => (
								<tr key={item.id}>
									<StyledTableCell>{++count}</StyledTableCell>
									<StyledTableCell>{item.rid}</StyledTableCell>

									<StyledTableCell>{item.request}</StyledTableCell>
									<StyledTableCell>
										{item.response == null ? (
											
											<Button
												variant="outlined"
												
												onClick={()=>reply(item.id)}
											>
												<span style={{ fontSize: 15 }}>Reply</span>
											</Button>
										) : (
											item.response
										)}
									</StyledTableCell>
								</tr>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</center>
	);
}
