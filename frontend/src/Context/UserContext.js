import { useContext, useState, useEffect, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

export const UserContext = createContext();

export function UserContextProvider(props) {
	const [currentUser, setCurrentUser] = useState();
	const [username, setUsername] = useState();
	const [tasks, setTasks] = useState([]);
	const [serverValidation, setServerValidation] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		client
			.get("/user")
			.then((res) => {
				setUsername(res.data['user']['username'])
				setCurrentUser(true);
				navigate("/private/home");
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
						setServerValidation('');
					});
			}).catch((err) => {
					setServerValidation("Username Already exists");
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
				setServerValidation('');
			}).catch((err) => {
				setServerValidation("Username or password incorrect")
			})
	};

	const addTask = (description) => {
		client.post('/add_task', {
			description: description,
		}).then((res) => {
			loadTasks();
		}).catch((err) => {
			console.log(err);
		})
	}

	const removeTask = (task_id) => {
		client.post('/remove_task', {
			id: task_id,
		}).then((res) => {
			loadTasks();
		}).catch((err) => {
			console.log(err);
		})
	}
 
	const logout = () => {
		client.post("/logout").then((res) => {
			setCurrentUser(false);
			navigate("/private/home");
		});
	};

	const loadTasks = useCallback(async () => {
		client.get("/tasks").then((res) => {
		   setTasks(Object.values(res.data));
	   }).catch((err) => {})
   }, [])

	return (
		<UserContext.Provider
			value={{ signUp, currentUser, signIn, logout,
				 username, loadTasks, tasks, serverValidation,
				  addTask, removeTask }}
		>
			{props.children}
		</UserContext.Provider>
	);
}
