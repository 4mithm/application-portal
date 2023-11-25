import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import swal from "sweetalert";

import { StyledTableCell, StyledTableRow } from "./adminstyle";

import {
	TableContainer,
	Table,
	
	TableBody,
	
	Paper,
} from "@mui/material";
Modal.setAppElement("#root");

export default function MyModal({ open, onClose ,token}) {
	const [data, setData] = useState(false);
	let result = null;

	if (!open[0]) return null;

	let fm = new FormData();
	fm.append('token',token)
	fm.append("id", open[1]);
	async function getData() {
		console.log("calling getData Function ........");
		result = await axios.post("http://localhost:8000/api/datatomodal", fm);
		
		if(result.data.rid==null){
			
			await swal({
				icon: "error",
				title: "Application Not Filled  ",
			});
			return;
		}
		setData(result.data.rid[0]);
		console.log(result.data.rid);
	}
	if (!data) getData();

	return (
		<>
			{data ? (
				data.rid === null ? (
					<span className="nodata">no Data</span>
				) : (
					<div className="modal">
						<Modal
							className="modalpack"
							isOpen={true}
							onRequestClose={onClose}
							style={{
								content: {
									backgroundColor: "white",

									padding: "10px",
									borderRadius: "1%",
									fontFamily: "Poppins",
									fontSize: "20px",
									minWidth: "400px",
									width: "60%",
									maxHeight: "90%",
								},
								overlay: {
									backgroundColor: " rgb(161, 160, 160,0.5)",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								},
							}}
						>
							<div
								className="modalheading"
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<h3>Student Application</h3>
								<button
									className="modalbutton"
									onClick={() => {
										onClose();
										setData(data);
									}}
								>
									&times;
								</button>
							</div>
							<div className="modalbody">
								<TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
									<Table className="modaltable">
										<TableBody>
											<StyledTableRow>
												<StyledTableCell>
													<span style={{marginRight:30}}>RegisterID:</span>
													{data.rid}
													<br />
													<br />
													<br />
													<span style={{marginRight:30}}>ApplicationID:</span>
													{data.aid}
													<br />
													<br />
													<span style={{marginRight:30}}>Status:</span>
													{data.status}
												</StyledTableCell>
												<StyledTableCell>
													<span>Photo</span>
													<br />
													<img
														src={"http://127.0.0.1:8000/storage/" + data.photo}
														style={{
															height: "170px",
															width: "175px",
															objectFit: "contain",
														}}
													></img>
												</StyledTableCell>
											</StyledTableRow>

											<StyledTableRow>
												<StyledTableCell>
													<span>FirstName</span>
													<br />
													{data.firstname}
												</StyledTableCell>
												<StyledTableCell>
													<span>LastName</span>
													<br />
													{data.lastname}
												</StyledTableCell>
											</StyledTableRow>

											<StyledTableRow>
												<StyledTableCell>
													<span>Course</span>
													<br />
													{data.course}
												</StyledTableCell>
												<StyledTableCell>
													<span>DOB</span>
													<br />
													{data.dob}
												</StyledTableCell>
											</StyledTableRow>

											<StyledTableRow>
												<StyledTableCell>
													<span>Email</span>
													<br />
													{data.email}
												</StyledTableCell>
												<StyledTableCell>
													<span>FatherName</span>
													<br />
													{data.fathername}
												</StyledTableCell>
											</StyledTableRow>

											<StyledTableRow>
												<StyledTableCell>
													<span>Gender</span>
													<br />
													{data.gender}
												</StyledTableCell>
												<StyledTableCell>
													<span>Phone</span>
													<br />
													{data.phone}
												</StyledTableCell>
											</StyledTableRow>

											<StyledTableRow>
												<StyledTableCell>
													<span>PUCMark</span>
													<br />
													{data.pumark}
												</StyledTableCell>
												<StyledTableCell>
													<span>CreatedAt</span>
													<br />
													{data.created_at}
												</StyledTableCell>
											</StyledTableRow>
											<StyledTableRow>
												<StyledTableCell>
													<span>PUMarksCard</span>
													<br />
													<img
														src={
															"http://127.0.0.1:8000/storage/" +
															data.pumarkscard
														}
														style={{
															maxHeight: "700px",
															maxWidth: "400px",
															objectFit: "contain",
														}}
													></img>
												</StyledTableCell>
												<StyledTableCell>
													<span>Address</span>
													<br />
													<span
														style={{
															maxWidth: "300px",
															wordWrap: "break-word",
															display: "inline-block",
														}}
													>
														{data.address}
													</span>
												</StyledTableCell>
											</StyledTableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</Modal>
					</div>
				)
			) : (
				<></>
			)}
		</>
	);
}
