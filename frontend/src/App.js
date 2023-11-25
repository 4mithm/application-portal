import { Routes, Route } from "react-router-dom";

import Admin from "./admin/admin";
import Portal from "./portal/portal";
import Student from "./student/student";
function App() {
	return (
		<>
			<Routes>
				<Route exact path="/*" element={<Portal />} />
				<Route path="login/student=:id/*" element={<Student />} />
				<Route path="login/admin=:id/*" element={<Admin />} />
			</Routes>
		</>
	);
}

export default App;
