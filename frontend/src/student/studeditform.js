import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
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
export default function StudEditForm(props) {
	const [data, setData] = useState({
		course: "",
		dob: "",
		fathername: "",
		phone: "",
		address: "",
		photo: "",
		pumark: "",
		gender: "",
		pumarkscard: "",
	});
	
	const [result, setRes] = useState(null);
	const [file, setFile] = useState();
	const [load, setLoad] = useState(true);
	const [reg, setReg] = useState("");
	const [course, setCourse] = useState([]);

	//..........................................................
	const [value, setValue] = React.useState(new Date("2014-08-18"));
	//-----------------------------------------------------------------------

	const handleChange = (newValue) => {
		setValue(newValue);
		console.log(newValue);
		setData({ ...data, date: newValue });
	};
	//.......................................
	const checkhandleChange= (event) => {
		const {
		  target: { value },
		} = event;
		let fval=value.filter((c)=>c!=='')
		console.log(fval)
		setData({ ...data, ['course']: fval.join() })
	
	  };
	  //-----------------------------------------------------------------------------------------
	  console.log(data.course)
	useEffect(() => {
		async function callback() {
			let fm = new FormData();
			fm.append('token',props.token)
			const res = await axios.post("http://127.0.0.1:8000/api/formcheck", fm);
			setReg(res.data.res[0]);
			console.log(res.data.res[0]);
			const cor = await axios.post(
				"http://127.0.0.1:8000/api/onlycoursename",
				fm
			);
			let coursearray = cor.data.map((item) => item.course);
			setCourse(coursearray);
			console.log(res.data.res);
			if (res.data.status === "filled") {
				setRes("alreadyfilled");
				if (
					res.data.status == "filled" &&
					(res.data.res[0].status == "accepted" ||
						res.data.res[0].status == "rejected")
				)
					setRes("processed");

				setData({
					["course"]: res.data.res[0].course,
					["phone"]: res.data.res[0].phone,
					["fathername"]: res.data.res[0].fathername,
					["pumark"]: res.data.res[0].pumark,
					["dob"]: res.data.res[0].dob,
					["gender"]: res.data.res[0].gender,

					["address"]: res.data.res[0].address,
				});
			}
			setLoad(false);
		}
		callback();
	}, []);
	//-----------------------------------------------------------------------

	function inputChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}
	//-----------------------------------------------------------------------

	async function fileChange(e) {
		var filePath = e.target.value;

		var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
		var imageExts = ["png", "jpg", "jpeg"];
		if (imageExts.indexOf(ext) === -1) {
			await swal("Choose a file type of .JPG  , .JPEG , .PNG ", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			setData({ ...data, [e.target.name]: "" });

			return;
		}
		setFile({ ...file, [e.target.name]: e.target.files[0] });
	}
	//-----------------------------------------------------------------------

	async function photoEdit(e) {
		e.preventDefault();
		if (file?.photo == null) {
			await swal("Select Profile Photo to upload", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		let fm = new FormData();
		fm.append("photo", file?.photo);

		fm.append('token',props.token)
		const res = await axios.post(
			"http://127.0.0.1:8000/api/editapplication",
			fm
		);

		if (res.data == "saved")
			await swal({
				icon: "success",
				title: "Photo  Uploaded Successfully ... ",
			});
	}
	//-----------------------------------------------------------------------

	async function pucardEdit(e) {
		e.preventDefault();
		if (file?.pumarkscard == null) {
			await swal("Select  PUC marks Card to upload", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		let fm = new FormData();
		fm.append("pumarkscard", file?.pumarkscard);
		fm.append('token',props.token)

		const res = await axios.post(
			"http://127.0.0.1:8000/api/editapplication",
			fm
		);
		if (res.data == "saved")
			await swal({
				icon: "success",
				title: "PU MarksCard Uploaded Successfully ... ",
			});
	}
	//-----------------------------------------------------------------------

	async function dataEdit(e) {
		e.preventDefault();
		let fm = new FormData();
		if (data.course.trim() === "") {
			await swal("Select Course", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		
		if (data.fathername.trim() === "") {
			await swal("Enter FatherName ", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}

		if (data.date === "") {
			await swal("Select Date Of Birth ", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		if (data.pumark === "") {
			await swal("Enter PUC Marks ", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		let pucint = parseInt(data.pumark);
		if (pucint < 0 || pucint > 100) {
			await swal("Enter Valid Pumark", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		if (data.phone === "") {
			await swal("Enter Phone number  ", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		var phoneno = /^\d{10}$/;
		if (!data.phone.match(phoneno)) {
			await swal("Phone Number Should Contain 10 Digits", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}

		if (data.address.trim() === "") {
			await swal("Enter Address ", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}

		for (let key in data) fm.append(key, data[key]);
		fm.append('token',props.token)
		const res = await axios.post(
			"http://127.0.0.1:8000/api/editapplication",
			fm
		);

		console.log(document.cookie);
		console.log(res.data);
		if (res.data == "saved")
			await swal({
				icon: "success",
				title: "Form Saved Successfully ... ",
			});
	}
	if (load)
		return (
			<div className="loaderoverlay">
				<Watch color="#00BFFF" height={110} width={110} />
			</div>
		);
	if (result == "processed")
		return <span className="message"> Already Processed</span>;
	if (result === "alreadyfilled")
		return (
			<div className="applicationdiv">
				<center>
					<form>
						<table className="application">
							<tbody>
								<tr>
									<td>
										<TextField
											className={myclass.fields}
											disabled
											color="secondary"
											id="outlined-disabled"
											label="RegisterID"
											defaultValue={reg.rid}
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
											label="Application Id"
											defaultValue={reg.aid}
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
											disabled
											id="outlined-disabled"
											label="Email"
											defaultValue={reg.email}
											style={{ width: "250px" }}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										/>
									</td>
									<td>
										<TextField
											disabled
											id="outlined-disabled"
											label="FirstName"
											defaultValue={reg.firstname}
											style={{ width: "250px" }}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										/>
									</td>
									<td>
										<TextField
											disabled
											id="outlined-disabled"
											label="LastName"
											defaultValue={reg.lastname}
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
										<InputLabel id="demo-simple-select-standard-label">
											Gender
										</InputLabel>
										<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											name="gender"
											color="secondary"
											onChange={inputChange}
											style={{ width: "250px" }}
											label="Age"
											value={data.gender}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										>
											<MenuItem value={"male"}>male</MenuItem>
											<MenuItem value={"female"}>female</MenuItem>
											<MenuItem value={"others"}>others</MenuItem>
										</Select>
									</td>
									<td>
									<InputLabel id="demo-multiple-checkbox-label">Select Courses</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={data.course.split(',')}
										style={{ width: "350px" }}
										onChange={checkhandleChange}
										input={<OutlinedInput label="Tag" />}
										renderValue={(selected) => selected.join(" , ")}
										MenuProps={MenuProps}
									>
										
										{course?course.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={data.course.split(',').indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										)):<></>}
									</Select>
									</td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>
										<TextField
											id="outlined-basic"
											label="FatherName"
											variant="outlined"
											color="secondary"
											type={"text"}
											required
											name="fathername"
											placeholder="FatherName"
											onChange={inputChange}
											style={{ width: "250px" }}
											autoComplete="off"
											value={data.fathername}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										/>
									</td>
									<td>
										<TextField
											id="outlined-basic"
											label="PUMarks"
											variant="outlined"
											type={"number"}
											required
											color="secondary"
											name={"pumark"}
											placeholder="PU marks"
											onChange={inputChange}
											style={{ width: "250px" }}
											autoComplete="off"
											value={data.pumark}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										/>
									</td>
									<td>
										<TextField
											id="outlined-basic"
											label="PhoneNumber"
											variant="outlined"
											type={"number"}
											name="phone"
											required
											color="secondary"
											placeholder="Phone number "
											onChange={inputChange}
											style={{ width: "250px" }}
											autoComplete="off"
											value={data.phone}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										/>
									</td>
								</tr>
							</tbody>

							<tbody>
								<tr>
									<td>
										<br />

										<TextField
											id="outlined-multiline-flexible"
											label="Address"
											multiline
											minRows={2}
											color="secondary"
											maxRows={5}
											required
											className="apptextarea"
											name="address"
											placeholder="Address"
											onChange={inputChange}
											autoComplete="off"
											value={data.address}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										/>
									</td>
									<td>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<MobileDatePicker
												label="Date mobile"
												inputFormat="MM/dd/yyyy"
												value={data?.date}
												color="secondary"
												name="date"
												style={{ width: "250px" }}
												onChange={handleChange}
												InputProps={{ style: myclass.input }}
												InputLabelProps={{ style: myclass.label }}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
									</td>
									<td>
										<Button
											onClick={dataEdit}
											variant="contained"
											color="secondary"
											style={{ marginLeft: "100px" }}
										>
											<span
												style={{
													fontSize: 20,
													fontFamily: "Poppins",
													paddingLeft: 10,
													paddingRight: 10,
												}}
											>
												SAVE
											</span>
										</Button>
									</td>
								</tr>
							</tbody>
							<tbody>
								<tr></tr>
							</tbody>
							<tbody>
								<tr style={{ border: "1px solid black" }}>
									<td>
										<Button variant="contained" component="label">
											<span
												style={{
													fontSize: 20,
													fontFamily: "Poppins",
													paddingLeft: 10,
													paddingRight: 10,
												}}
											>
												Choose MarksCard
											</span>
											<input
												hidden
												name={"pumarkscard"}
												multiple
												type="file"
												onChange={fileChange}
											/>
										</Button>
										<br />
										{data.pumarkscard?.name}
										{/* <span>PU Marks Card</span>
										<br />
										<input
											type={"file"}
											name={"pumarkscard"}
											onChange={fileChange}
										/> */}
									</td>
									<td></td>
									<td>
										<Button
											onClick={pucardEdit}
											variant="contained"
											color="success"
											style={{ marginLeft: "100px" }}
										>
											<span
												style={{
													fontSize: 20,
													fontFamily: "Poppins",
													paddingLeft: 10,
													paddingRight: 10,
												}}
											>
												UPLOAD
											</span>
										</Button>

										{/* <button onClick={pucardEdit}>Upload </button> */}
									</td>
								</tr>
							</tbody>
							<tbody>
								<tr style={{ border: "1px solid black" }}>
									<td>
										<Button variant="contained" component="label">
											<span
												style={{
													fontSize: 20,
													fontFamily: "Poppins",
													paddingLeft: 10,
													paddingRight: 10,
												}}
											>
												Choose Photo
											</span>
											<input
												hidden
												name="photo"
												multiple
												type="file"
												onChange={fileChange}
											/>
										</Button>
										{data.photo?.name}
										{/* <span>Profile Photo</span>
										<br />
										<input type={"file"} name="photo" onChange={fileChange} /> */}
									</td>
									<td></td>
									<td>
										<Button
											onClick={photoEdit}
											variant="contained"
											color="success"
											style={{ marginLeft: "100px" }}
										>
											<span
												style={{
													fontSize: 20,
													fontFamily: "Poppins",
													paddingLeft: 10,
													paddingRight: 10,
												}}
											>
												UPLOAD
											</span>
										</Button>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</center>
			</div>
		);
	else return <span style={{ fontSize: "25px" }}> Fill The Form </span>;
}
