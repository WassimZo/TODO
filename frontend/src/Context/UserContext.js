import { useContext, useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


const client = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/api`,
	headers: {
		"Accept": "application/json",
		"content-Type": "application/json",
		"X-CSRFToken": Cookies.get("csrftoken"),
	},
});

export const UserContext = createContext();

export function UserContextProvider(props) {
	const [currentUser, setCurrentUser] = useState();
	const [username, setUsername] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		client
			.get("/user")
			.then((res) => {
				console.log(res);
				setCurrentUser(true);
			})
			.catch((err) => {
				setCurrentUser(false);
			});
	}, []);

	const signUp = (username, pwd) => {
		client
			.post("/register", {
				username: username,
				password: pwd,
			})
			.then((res) => {
				client
					.post("/login", {
						username: username,
						password: pwd,
					})
					.then((res) => {
						setCurrentUser(true);
						setUsername(username);
						navigate("/private/home");
					});
			});
	};

	const signIn = (username, pwd) => {
		client
			.post("/login", {
				username: username,
				password: pwd,
			})
			.then((res) => {
				setCurrentUser(true);
				setUsername(username);
				navigate("/private/home");
			});
	};

	const logout = () => {
		client.post("/logout").then((res) => {
			setCurrentUser(false);
			navigate("/private/home");
		});
	};

	return (
		<UserContext.Provider
			value={{ signUp, currentUser, signIn, logout, username }}
		>
			{props.children}
		</UserContext.Provider>
	);
}
