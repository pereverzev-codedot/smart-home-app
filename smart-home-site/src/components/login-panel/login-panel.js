import React, { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const LoginPanel = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}
	return (
		<div className="login-panel">
			<div className="input-panel">
				<TextField
					className="login-input"
					id="email"
					type="email"
					name="email"
					label="Enter Login"
					onChange={changeHandler}
				/>
				<TextField
					className="login-input"
					id="password"
					type="password"
					name="password"
					onChange={changeHandler}
					label="Password"
				/>
			</div>
			<div className="button-panel">
				<div>
					<Button className="login-button">Forgot password?</Button>
					<Button className="login-button">Login</Button>
				</div>
				<div>
					<Link to="/register">
						<span className="registration-link">Register to manage your home</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default LoginPanel
