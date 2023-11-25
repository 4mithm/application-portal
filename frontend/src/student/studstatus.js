import React, { useEffect, useState } from "react";
import axios from "axios";

var res=''
export default function StudStatus(props) {
	let [checkstatus, setStatus] = useState();
	
	useEffect(() => {
		async function statuscheck() {
			let fm =new FormData();
			fm.append('token',props.token)
			 res = await axios.post("http://localhost:8000/api/statuscheck",fm);
			//console.log(res.data.result[0].status)
			//console.log(res.data.result.status)
			if (res.data.result == "pending") setStatus("pending");
			else if (res.data.result == "accepted") setStatus("Accepted");
			else if (res.data.result== "rejected") setStatus("Rejected");
			else  if(res.data.result=='notfilled') setStatus('Fill The Form ')

		}
		statuscheck();
	}, []);
	return (
		<>
			<span
			style={{
				fontSize:'25px'
			}}
			>Your Status....</span>
			<h1>{checkstatus}</h1>
			{checkstatus == "Accepted"?<h1>&nbsp; for &nbsp;{res.data.course}</h1>:<></>}
			
		</>
	);
}
