import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import CSRFToken from "../../Component/CSRFToken";
import "../LoginPage/Login.css";

export default function Register() {
	const [validation, setValidation] = useState("");
	const { signUp } = useContext(UserContext);

	const inputs = useRef([]);
	const addinputs = (e) => {
		if (e && !inputs.current.includes(e)) {
			inputs.current.push(e);
		}
	};
	const formRef = useRef();

	const handleForm = async (e) => {
		e.preventDefault();

		// Validation coté front
		if (
			(inputs.current[1].value.length || inputs.current[2].value.length) < 8
		) {
			setValidation("8 characters minimum !");
			return;
		} else if (inputs.current[1].value !== inputs.current[2].value) {
			setValidation("passwords do not match !");
			return;
		}

		//Validation coté back
		try {
			const cred = await signUp(
				inputs.current[0].value,
				inputs.current[1].value
			);
			formRef.current.reset();
			setValidation("");
		} catch (err) {
			if (err.code === "ERR_BAD_REQUEST") {
				setValidation("Username Already exists");
			}
		}
	};

	return (
		<div className="main-container">
			<h1 className="main-title">TODO</h1>
			<form
				action="#"
				className="login-form"
				onSubmit={(e) => {
					handleForm(e);
				}}
				ref={formRef}
			>
				<CSRFToken />
				<label htmlFor="username">Username :</label>
				<input type="text" id="username" name="username" ref={addinputs} />
				<label htmlFor="pwd">Password :</label>
				<input type="password" name="pwd" id="pwd" ref={addinputs} />
				<label htmlFor="confirm-pwd">Confirm Password :</label>
				<input
					type="password"
					name="confirm-pwd"
					id="confirm-pwd"
					ref={addinputs}
				/>
				<span>{validation}</span>
				<span>
					Have an account ? <a href="/">Login here</a>
				</span>
				<button type="submit" className="login-btn">
					Register
				</button>
			</form>
		</div>
	);
}
