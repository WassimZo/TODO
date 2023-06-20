import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import "./Login.css";

export default function Login() {
	const { signIn, serverValidation } = useContext(UserContext);

	const inputs = useRef([]);
	const addinputs = (e) => {
		if (e && !inputs.current.includes(e)) {
			inputs.current.push(e);
		}
	};

	const formRef = useRef();

	const handleLogin = async (e) => {
		e.preventDefault();
		//validation coté serveur
		try {
			const cred = await signIn(
				inputs.current[0].value,
				inputs.current[1].value
			);
			formRef.current.reset();
		} catch (err) {}
	};

	return (
		<div className="main-container">
			<h1 className="main-title">TODO</h1>
			<form
				action="#"
				className="login-form"
				ref={formRef}
				onSubmit={(e) => {
					handleLogin(e);
				}}
			>
				<label htmlFor="username">Username :</label>
				<input type="text" id="username" name="username" ref={addinputs} />
				<label htmlFor="pwd">Password :</label>
				<input type="password" name="pwd" id="pwd" ref={addinputs} />
				<span>{serverValidation}</span>
				<span>
					Dont have account ? <a href="/register">Register here</a>
				</span>
				<button type="submit" className="login-btn">
					Login
				</button>
			</form>
		</div>
	);
}
