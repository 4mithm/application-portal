import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { Watch } from "react-loader-spinner";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";

const myclass = {
	input: {
		fontSize: 17,
		fontFamily: "Poppins",
		marginRight: "50px",
		width: "350px",
	},
	label: {
		fontSize: 15,
		fontFamily: "Poppins",
	},
};

export default function StudentForm(props) {
	const [data, setData] = useState({
		fathername: "",
		address: "",
		photo: "",
		pumark: "",
		pumarkscard: "",
		course: '',
		phone: "",
		date: "",
		gender: "",
	});
	const [result, setRes] = useState(null);
	const [load, setLoad] = useState(true);
	const [reg, setReg] = useState("");
	const [course, setCourse] = useState([]);
	const [appid, setAppId] = useState('');
	const [selectcourse, setSelectedCourse] = useState([]);

	//..........................................................
	const [value, setValue] = React.useState(new Date("2014-08-18"));

	const handleChange = (newValue) => {
		setValue(newValue);
		console.log(newValue);
		setData({ ...data, date: newValue });
	};
	//.......................................

	console.log(data);
	useEffect(() => {
		async function callback() {
			let coursearray = "";
			let fm = new FormData();
			fm.append('token',props.token)
			const res = await axios.post("http://127.0.0.1:8000/api/formcheck", fm);
			setReg(res.data.res[0]);
			setAppId(res.data.aid);
			const cor = await axios.post(
				"http://127.0.0.1:8000/api/onlycoursename",
				fm
			);

			coursearray = cor.data.map((item) => item.course);

			setSelectedCourse(coursearray);

			if (res.data.status === "filled") {
				setRes("alreadyfilled");
			}
			setLoad(false);
		}
		callback();
	}, []);
	console.log(data)
	//----------------------------------------------------------------------------------
	async function inputChange(e) {
		// console.log(e.target.value);
		if (e.target.type === "file") {
			var filePath = e.target.value;

			var ext = filePath.substring(filePath.lastIndexOf(".") + 1);
			var imageExts = ["png", "jpg", "jpeg"];
			if (imageExts.indexOf(ext) === -1) {
				await swal("Choose a file type of .JPG ,.JPEG,.PNG ", {
					buttons: false,
					timer: 1500,
					icon: "warning",
				});
				setData({ ...data, [e.target.name]: "" });

				return;
			}
			setData({ ...data, [e.target.name]: e.target.files[0] });
		} else setData({ ...data, [e.target.name]: e.target.value });
	}

	async function addstudinfo(e) {
		e.preventDefault();
		if (data.course === "") {
			await swal("Select Course ", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		if (data.gender === "") {
			console.log(Object.keys(data).length);
			await swal("Select Gender", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		if (data.photo === "" || data.photo === undefined) {
			await swal("Choose Photo", {
				buttons: false,
				timer: 1500,
				icon: "warning",
			});
			return;
		}
		if (data.pumarkscard === "" || data.pumarkscard === undefined) {
			await swal("Choose PUC marks Card", {
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

		let formdata = new FormData();
		for (let key in data) formdata.append(key, data[key]);
		formdata.append("aid", appid);

		formdata.append('token',props.token)
		console.log(data);
		setLoad(true);
		let res = await axios.post(
			" http://127.0.0.1:8000/api/application",
			formdata
		);
		setLoad(false);
		console.log(res.data);

		if (res.data.status === "infosaved") {
			await swal({
				icon: "success",
				title: "Form Saved Successfully ... ",
			});
			setRes("alreadyfilled");
		}
	}
	//--------------------------------------------------------------------
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
	const checkhandleChange = (event) => {
		const {
			target: { value },
		} = event;
		setData({ ...data, ['course']: value.join() })
		setCourse(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};
	//----------------------------------------------------------------------------------------------
	if (load)
		return (
			<div className="loaderoverlay">
				<Watch color="violet" height={70} width={70} />
			</div>
		);
	if (result === "alreadyfilled")
		return <span className="message"> Filled .....</span>;
	// <TextField id="outlined-basic" label="Outlined" variant="outlined" />
	return (
		<div className="applicationdiv">
			<center>
				<form>
					<table className="application">
						<tbody>
							<tr>
								<td>
									<TextField
										disabled
										id="outlined-disabled"
										label="Application Id"
										defaultValue={appid}
										InputLabelProps={{ style: myclass.label }}
										InputProps={{
											style: {
												fontSize: 17,
												fontFamily: "Poppins",
												width: "200px",
											},
										}}
									/>
								</td>

								<td></td>
							</tr>

							<tr>
								<td>
									<TextField
										disabled
										id="outlined-disabled"
										label="RegisterID"
										defaultValue={reg.rid}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
								</td>

								<td>
									<TextField
										disabled
										id="outlined-disabled"
										label="Email"
										defaultValue={reg.email}
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
								</td>
							</tr>

							<tr>
								<td>
									<TextField
										disabled
										id="outlined-disabled"
										label="FirstName"
										defaultValue={reg.firstname}
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
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>{" "}
								</td>
							</tr>

							<tr>
								<td>
									<InputLabel id="demo-multiple-checkbox-label">Select Courses</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={course}
										style={{ width: "350px" }}
										onChange={checkhandleChange}
										input={<OutlinedInput label="Tag" />}
										renderValue={(selected) => selected.join(" , ")}
										MenuProps={MenuProps}
									>
										
										{selectcourse?selectcourse.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={course.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										)):<></>}
									</Select>
								</td>

								<td>
									<InputLabel id="demo-simple-select-standard-label">
										Gender
									</InputLabel>
									<Select
										labelId="demo-simple-select-standard-label"
										id="demo-simple-select-standard"
										name="gender"
										onChange={inputChange}
										style={{ width: "350px" }}
										label="Gender"
									>
										<MenuItem
											style={{ color: "black", fontSize: "14px" }}
											value={"male"}
										>
											Male
										</MenuItem>
										<MenuItem
											style={{ color: "black", fontSize: "14px" }}
											value={"female"}
										>
											Female
										</MenuItem>
										<MenuItem
											style={{ color: "black", fontSize: "14px" }}
											value={"others"}
										>
											Others
										</MenuItem>
									</Select>
								</td>
							</tr>

							<tr>
								<td>
									<Button
										variant="contained"
										color="secondary"
										component="label"
									>
										<span className="btnspan">Upload Photo</span>
										<input
											hidden
											name="photo"
											multiple
											type="file"
											onChange={inputChange}
										/>
									</Button>
									<br />
									{data.photo?.name}
								</td>
								<td>
									<Button variant="contained" component="label">
										<span className="btnspan">Upload PUMarksCard</span>
										<input
											hidden
											name={"pumarkscard"}
											multiple
											type="file"
											onChange={inputChange}
											InputProps={{ style: myclass.input }}
											InputLabelProps={{ style: myclass.label }}
										/>
									</Button>
									<br /> {data.pumarkscard?.name}
								</td>
							</tr>

							<tr>
								<td>
									<TextField
										id="outlined-basic"
										label="FatherName"
										variant="outlined"
										type={"text"}
										name="fathername"
										placeholder="FatherName"
										onChange={inputChange}
										autoComplete="off"
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
								</td>
								<td>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<MobileDatePicker
											label="Date Of Birth"
											inputFormat="MM/dd/yyyy"
											value={data?.date}
											name="date"
											InputProps={{ style: { width: 350 } }}
											onChange={handleChange}
											renderInput={(params) => <TextField {...params} />}
											InputLabelProps={{ style: myclass.label }}
										/>
									</LocalizationProvider>
									{/* <DesktopDatePicker

										label="Date desktop"
										inputFormat="MM/dd/yyyy"
										onChange={inputChange}
										autoComplete="off"
										
									/> */}

									{/* <input
										id="outlined-basic"
										label="Outlined"
										variant="outlined"
										type={"date"}
										name="dob"
										
									/> */}
								</td>
							</tr>

							<tr>
								<td>
									<TextField
										id="outlined-basic"
										label="PUMarks"
										variant="outlined"
										type={"number"}
										name={"pumark"}
										placeholder="PU marks"
										onChange={inputChange}
										autoComplete="off"
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
										placeholder="Phone number "
										onChange={inputChange}
										autoComplete="off"
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
								</td>
							</tr>

							<tr>
								<td>
									<br />
									<TextField
										id="outlined-multiline-flexible"
										label="Address"
										multiline
										minRows={2}
										maxRows={4}
										className="apptextarea"
										name="address"
										placeholder="Address"
										onChange={inputChange}
										autoComplete="off"
										InputProps={{ style: myclass.input }}
										InputLabelProps={{ style: myclass.label }}
									/>
								</td>
								<td>
									<Button
										onClick={addstudinfo}
										variant="contained"
										color="success"
									>
										<span className="btnspan">Submit</span>
									</Button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</center>
		</div>
	);
}
