import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "./Navbar.css";

export default function Navbar() {
	const { logout, username } = useContext(UserContext);
	return (
		<div className="navbar">
			<span>hello {username}</span>
			<h1>TODO</h1>
			<div className="logout-container">
				<button onClick={logout}>Logout</button>
			</div>
		</div>
	);
}
