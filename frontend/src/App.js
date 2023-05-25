import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage/Login.js";
import Register from "./Pages/RegisterPage/Register.js";
import Home from "./Pages/HomePage/Home";
import Private from "./Pages/Private";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/private" element={<Private />}>
					<Route path="/private/home" element={<Home />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
