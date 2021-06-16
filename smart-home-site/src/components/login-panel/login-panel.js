import React, { useContext, useState } from "react"
import { TextField, Button } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"
import { Link } from "react-router-dom"

import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"
import { ThemeContextConsumer } from "../../context/ThemeContext"

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
			auth.login(data.token, data.userId, data.email, data.nickname)
			localStorage.setItem("theme", data.theme)
		} catch (e) {
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
					label="Enter email"
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
					<Link  to="/register"><Button  className="login-button">
            <span className="registration-link">Register</span>
          </Button></Link>
					<ThemeContextConsumer>
						{(context) => (
							<Button
								className="login-button"
								onClick={() => {
									loginHandler()
									context.setThemeLocal()
								}}
							>
								Login
							</Button>
						)}
					</ThemeContextConsumer>
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
