import React, { useContext, useState } from "react"
import { TextField, Button } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"
import { Link } from "react-router-dom"

import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"

const LoginPanel = () => {
	const auth = useContext(AuthContext)
	const [open, setOpen] = React.useState(false)
	const [alertMsg, setAlertMsg] = React.useState("Register success")
	const [severity, setSeverity] = React.useState("success")
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return
		}

		setOpen(false)
	}

	const { loading, error, request } = useHttp()
	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const loginHandler = async () => {
		try {
			const data = await request("/api/auth/login", "POST", { ...form })
			setAlertMsg("Вы успешно вошли в систему")
			setSeverity("success")
			setOpen(true)
			console.log("err")
			auth.login(data.token, data.userId)
		} catch (e) {
			console.log("err")
			setAlertMsg(e.message)
			setSeverity("error")
			setOpen(true)
		}
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
				<div className="row-js-btw">
					<Button className="login-button">Forgot password?</Button>
					<Button className="login-button" onClick={loginHandler}>
						Login
					</Button>
				</div>
				<div>
					<Link to="/register">
						<span className="registration-link">Register to manage your home</span>
					</Link>
				</div>
			</div>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity}>
					{alertMsg}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default LoginPanel
