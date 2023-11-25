import React, { useState, useEffect } from "react";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import MyModal from "./mymodal";
import { TableBody, TableHead, Table } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./adminstyle";
import Button from "@mui/material/Button";
export default function Search(props) {
	let [value, setValue] = useState({});
	let [data, seStyledTableCellata] = useState();
	let [Open, setOpen] = useState(false);
	const [course, setCourse] = useState("");
	useEffect(() => {
		async function callback() {
			let fm = new FormData();
			fm.append('token',props.token)
			const cor = await axios.post("http://127.0.0.1:8000/api/onlycoursename",fm);
			setCourse(cor.data);
		}
		callback();
	}, []);

	function getValue(e) {
		setValue({ ...value, [e.target.name]: e.target.value });
	}
	async function submit() {
		let fm = new FormData();

		if (!value?.course == "") fm.append("course", value.course);
		if (!value?.id == "") fm.append("rid", value.id);
		if (!value?.aid == "") fm.append("aid", value.aid);

		if (!value?.gender == "") fm.append("gender", value.gender);
		if (!value?.pumark == "") fm.append("pumark", value.pumark);

		// console.log(fm.get('course'))
		// console.log(fm.get('id'))
		// console.log(fm.get('gender'))
		// console.log(fm.get('pumark'))
	
		fm.append('token',props.token)

		const res = await axios.post("http://127.0.0.1:8000/api/search", fm);
		seStyledTableCellata(res.data);
		console.log(res.data);
	}

	return (
		<div className="manreg">
			<h3>Search for Applications</h3>
			<Table>
				<TableBody>
				<StyledTableRow>
						
						<StyledTableCell>
							<Button
								variant="contained"
								color="success"
								onClick={submit}
								style={{ margin: 10 }}
							>
								<span style={{ fontSize: 15 }}>Search</span>
							</Button>
						</StyledTableCell>
					</StyledTableRow>
					<StyledTableRow>
						<StyledTableCell>
							Enter ID
							<br />
							<input type={"number"} name={"id"} onChange={getValue} />
						</StyledTableCell>

						<StyledTableCell>
							Enter AppId <br />
							<label>BCKAPPid-</label>
							<input type={"number"} name={"aid"} onChange={getValue} />
						</StyledTableCell>
					</StyledTableRow>

					<StyledTableRow>
						<StyledTableCell>
							<sStyledTableRowong>Course</sStyledTableRowong>
							<br />
						</StyledTableCell>

						<StyledTableCell>
							{course && course[0].course != null ? (
								course.map((item) => (
									<>
										<input
											name="course"
											type={"radio"}
											onChange={getValue}
											value={item.course}
										/>
										{item.course}
									</>
								))
							) : (
								<></>
							)}
							<input
								type={"radio"}
								name={"course"}
								onChange={getValue}
								value={""}
							/>
							None
						</StyledTableCell>
					</StyledTableRow>

					<StyledTableRow>
						<StyledTableCell>
							<sStyledTableRowong>Gender</sStyledTableRowong>
						</StyledTableCell>

						<StyledTableCell>
							<input
								type={"radio"}
								name={"gender"}
								onChange={getValue}
								value={"male"}
							/>
							Male
							<input
								type={"radio"}
								name={"gender"}
								onChange={getValue}
								value={"female"}
							/>
							Female
							<input
								type={"radio"}
								name={"gender"}
								value={"others"}
								onChange={getValue}
							/>
							Others
							<input
								type={"radio"}
								name={"gender"}
								onChange={getValue}
								value={""}
							/>
							None
						</StyledTableCell>
					</StyledTableRow>

					<StyledTableRow>
						<StyledTableCell>
							<sStyledTableRowong>PUMark</sStyledTableRowong>
							<br />
						</StyledTableCell>

						<StyledTableCell>
							<input
								type={"radio"}
								name={"pumark"}
								onChange={getValue}
								value={"90"}
							/>
							&ge;90
							<input
								type={"radio"}
								name={"pumark"}
								onChange={getValue}
								value={"80"}
							/>
							&ge;80
							<input
								type={"radio"}
								name={"pumark"}
								onChange={getValue}
								value={"60"}
							/>
							&ge;60
							<input
								type={"radio"}
								name={"pumark"}
								onChange={getValue}
								value={""}
							/>
							None
						</StyledTableCell>
					</StyledTableRow>

					
				</TableBody>
			</Table>

			{data?.[0].rid == null ? (
				<h1 className="nodata">no Data</h1>
			) : (
				<>
					<Table sx={{width:'100%'}}>
						<TableHead>
							<StyledTableRow>
								<StyledTableCell>RegisterId</StyledTableCell>
								<StyledTableCell>AppId</StyledTableCell>
								<StyledTableCell>Gender</StyledTableCell>
								<StyledTableCell>PUMark</StyledTableCell>
								<StyledTableCell>Course</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>Viewmore</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{data.map((item) => (
								<StyledTableRow key={item.rid}>
									<StyledTableCell>{item.rid}</StyledTableCell>
									<StyledTableCell>{item.aid}</StyledTableCell>
									<StyledTableCell>{item.gender}</StyledTableCell>
									<StyledTableCell>{item.pumark}</StyledTableCell>
									<StyledTableCell>{item.course}</StyledTableCell>
									<StyledTableCell>{item.status}</StyledTableCell>
									<StyledTableCell>
										<button
											className="viewmore"
											onClick={() => setOpen([true, item.rid])}
										>
											Viewmore
										</button>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</>
			)}
			{Open ? <MyModal open={Open} onClose={() => setOpen(false)} token={props.token} /> : <></>}
		</div>
	);
}
