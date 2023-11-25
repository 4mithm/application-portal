import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

export default function AddCourse(props) {
	let [input, setInput] = useState({});
	function inputChange(e) {
		setInput({ ...input, [e.target.name]: e.target.value });
	}
	async function submit() {
		if (Object.keys(input) < 2) {
			await swal("Cannot Be Empty ", {
				buttons: false,
				timer: 750,
				icon: "warning",
			});
			return;
		}

		if (input?.coursename.trim() == "" || input?.descip.trim() == "") {
			await swal("Cannot Be Empty ", {
				buttons: false,
				timer: 750,
				icon: "warning",
			});
			return;
		}
		let fm = new FormData();
		let capcourse = input.coursename.toUpperCase();
		fm.append("course", capcourse);
		fm.append("descip", input.descip);

		fm.append("token", props.token);
		let res = await axios.post("http://localhost:8000/api/addcourse", fm);
		if (res.data == "saved") {
			swal({
				icon: "success",
				title: "Course Added .... ",
			});
			setInput({ coursename: "", descip: "" });
		}
	}
	console.log(input);
	return (
		<div className="course flexclass">
			<table>
				<tbody>
					<tr>
						<td>
							<TextField
								id="outlined-basic"
								label="Course"
								variant="outlined"
								type={"text"}
								color="secondary"
								name="coursename"
								onChange={inputChange}
								value={input.coursename}
								placeholder="Course"
								autoComplete="off"
								InputProps={{ style: myclass.input }}
								InputLabelProps={{ style: myclass.label }}
							/>

							<TextField
								id="outlined-multiline-flexible"
								label="Desciption"
								multiline
								color="secondary"
								minRows={7}
								maxRows={12}
								name="descip"
								placeholder="Desciption"
								onChange={inputChange}
								autoComplete="off"
								value={input.descip}
								InputProps={{
									style: {
										fontSize: 17,
										fontFamily: "Poppins",
										marginRight: "50px",
										width: "550px",
									},
								}}
								InputLabelProps={{ style: myclass.label }}
							/>

							<Button variant="contained" color="secondary" onClick={submit}>
								<span className="btnspan">ADD</span>
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
