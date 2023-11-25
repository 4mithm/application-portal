import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Watch } from "react-loader-spinner";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const myclass = {
	input: {
		fontSize: 17,
		fontFamily: "Poppins",
		marginRight: "30px",
		width: "250px",
	},
	label: {
		fontSize: 15,
		fontFamily: "Poppins",
	},
};
export default function View(props) {
	let [load, setLoad] = useState(true);
	let [data, setData] = useState();
	const compoRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => compoRef.current,
	});
	useEffect(() => {
		getData();
	}, []);
	async function getData() {
		let fm =new FormData();
		fm.append('token',props.token)
		const res = await axios.post("http://localhost:8000/api/formcheck",fm);
		if (res.data.status === "filled") setData(res.data.res[0]);
		else setData("fillform");
		setLoad(false);
	}
	if (load)
		return (
			<div className="loaderoverlay">
				<Watch color="#00BFFF" height={110} width={110} />
			</div>
		);
	return (
		<div className="studview">
			{data ? (
				data === "fillform" ? (
					<h1 className="nodata">Fill The Form</h1>
				) : (
					<>
						<div className="viewbody">
							
							<Button color="secondary"  variant="contained"style={{ maxHeight: "40px", width: "100px", marginTop: 100,marginRight:150 }}
								onClick={handlePrint}
							><span style={{fontSize:14}}>Print</span></Button>

							<center ref={compoRef}>
								<div className="printheading">
									<span>
										Bhandarkars'
										<br /> Arts and Science <br />
										College,Kundapura
									</span>
									<span>
										Email: basck1963@
										<br />
										rediffmail.com
										<br />
										Phone: 08254230369
									</span>
								</div>
								<hr></hr>

								<table className="viewtable">
									<thead>
										<tr>
											<span
												style={{
													fontSize: "20px",
													float: "left",
												}}
											>
												Application For Admission{" "}
											</span>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="RegisterID"
													defaultValue={data.rid}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/><br/>
												<br/>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="Application Id"
													defaultValue={data.aid}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
											<td>
												<span>Photo</span>
												<br />
												<img
													src={"http://127.0.0.1:8000/storage/" + data.photo}
													style={{
														height: "200px",
														width: "200px",
														objectFit: "contain",
													}}
												></img>
											</td>
										</tr>
									</tbody>
									<tbody>
										<tr>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="FirstName"
													defaultValue={data.firstname}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="LastName"
													defaultValue={data.lastname}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
										</tr>
									</tbody>
									<tbody>
										<tr>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="Course"
													defaultValue={data.course}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="DOB"
													defaultValue={data.delbutton}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
										</tr>
									</tbody>
									<tbody>
										<tr>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="Email"
													defaultValue={data.email}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="FatherName"
													defaultValue={data.fathername}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
										</tr>
									</tbody>
									<tbody>
										<tr>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="Gender"
													defaultValue={data.gender}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="Phone"
													defaultValue={data.phone}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
										</tr>
									</tbody>

									<tbody>
										<tr>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="PUMarks"
													defaultValue={data.pumark}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													color="secondary"
													id="outlined-disabled"
													label="Created At"
													defaultValue={data.created_at}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
										</tr>
									</tbody>
									<tbody>
										<tr>
											<td>
												<TextField
													className={myclass.fields}
													disabled
													multiline
													color="secondary"
													id="outlined-disabled"
													label="Address"
													
													defaultValue={data.address}
													style={{ width: "250px" }}
													InputProps={{ style: myclass.input }}
													InputLabelProps={{ style: myclass.label }}
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</center>
							<div style={{marginLeft:100}}>
								<span>PUMarksCard</span>
								<br />
								<img
									src={"http://127.0.0.1:8000/storage/" + data.pumarkscard}
									style={{
										maxHeight: "500px",
										maxWidth: "300px",
										objectFit: "contain",
									}}
								></img>
							</div>
						</div>
					</>
				)
			) : (
				<></>
			)}
		</div>
	);
}
