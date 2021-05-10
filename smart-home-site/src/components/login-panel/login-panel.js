import React from "react"
import { TextField, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const LoginPanel = () => {
	return (
		<div className="login-panel">
			<div className="input-panel">
				<TextField className="login-input" label="Enter Login" />
				<TextField className="login-input" label="Password" />
			</div>
			<div className="button-panel">
				<Button className="login-button">Forgot password?</Button>
				<Button className="login-button">Login</Button>
				<Link to="/register">
					<span className="registration-link">Register to manage your home</span>
				</Link>
			</div>
		</div>
	)
}

export default LoginPanel
