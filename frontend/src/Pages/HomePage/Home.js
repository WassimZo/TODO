import React, { useState, useContext, useEffect, useRef } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Task from "../../Component/Navbar/Tasks/Task";
import { UserContext } from "../../Context/UserContext";
import "./Home.css";

export default function Home() {
	const [addTaskForm, setAddTaskForm] = useState(false);
	const {loadTasks, tasks, addTask} = useContext(UserContext)

	const inputRef = useRef()
	const formRef = useRef()

	const handleAddTaskButton = () => {
		setAddTaskForm(true);
	};

	const handleAddTaskForm = async (e) => {
		e.preventDefault();

		try {
			const task = await addTask(inputRef.current.value);
			formRef.current.reset()
		} catch(err) {}
	};
	
	

	useEffect(() => {
		loadTasks().catch(console.error)
	}, [loadTasks]);

	return (
		<div className="main">
			<Navbar />
			<div className="task-container">
				<h1>Tasks</h1>
				{!tasks.includes("no tasks found") && tasks.map(task => (<Task key={task.id} id={task.id} description={task.description}/>))}
				{!addTaskForm ? (
					<button className="add-btn" onClick={handleAddTaskButton}>
						+
					</button>
				) : (
					<form action="#" className="form-task" ref={formRef} onSubmit={(e) => { handleAddTaskForm(e)}}>
						<input
							type="text"
							name="new-task"
							className="input-task"
							id="new-task"
							placeholder="Add your task"
							ref={inputRef}
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
