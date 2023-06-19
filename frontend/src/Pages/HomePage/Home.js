import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Task from "../../Component/Navbar/Tasks/Task";
import { UserContext } from "../../Context/UserContext";
import "./Home.css";

export default function Home() {
	const [addTaskForm, setAddTaskForm] = useState(false);
	const {loadTasks, tasks} = useContext(UserContext)

	const handleAddTask = () => {
		setAddTaskForm(true);
	};
	
	

	useEffect(() => {
		loadTasks().catch(console.error)
	}, [loadTasks]);

	return (
		<div className="main">
			<Navbar />
			<div className="task-container">
				<h1>Tasks</h1>
				{!tasks.includes("no tasks found") && tasks.map(task => (<Task key={task.id} description={task.description}/>))}
				{!addTaskForm ? (
					<button className="add-btn" onClick={handleAddTask}>
						+
					</button>
				) : (
					<form action="#" className="form-task">
						<input
							type="text"
							name="new-task"
							className="input-task"
							id="new-task"
							placeholder="Add your task"
						/>
						<button type="submit" className="submit-task">
							+
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
