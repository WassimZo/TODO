import React, { useState, useContext } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Task from "../../Component/Navbar/Tasks/Task";
import "./Home.css";

export default function Home() {
	const [addTaskForm, setAddTaskForm] = useState(false);

	const handleAddTask = () => {
		setAddTaskForm(true);
	};

	return (
		<div className="main">
			<Navbar />
			<div className="task-container">
				<h1>Tasks</h1>
				<Task description="miwmiw" />
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
