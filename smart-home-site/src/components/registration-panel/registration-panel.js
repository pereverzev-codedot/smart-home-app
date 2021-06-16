import React, { useEffect, useState } from "react"
import { TextField, Button } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"
import { Link } from "react-router-dom"

import { useHttp } from "../../hooks/http.hook"

const RegistrationPanel = () => {
	const [open, setOpen] = React.useState(false)
	const [alertMsg, setAlertMsg] = React.useState("Register success")
	const [severity, setSeverity] = React.useState("success")
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return
		}

		setOpen(false)
	}

	const { loading, request, error } = useHttp()
	const [form, setForm] = useState({
		nickname: "",
		email: "",
		password: "",
		repeatedPassword: "",
    accessKey: ""
	})
	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}
	const registerHandler = async () => {
	  if(form.password.length < 6){
      setAlertMsg("Пароль должен быть больше 6 символов в длинну")
      setSeverity("error")
      setOpen(true)
    }
	  else if (form.repeatedPassword === form.password) {
			  try {
				const data = await request("api/auth/register", "POST", { ...form })
				setAlertMsg("Вы успешно зарегистрировали аккаунт")
				setSeverity("success")
				setOpen(true)

				console.log("data: ", data)
			  } catch (e) {
				console.log("err")
				setAlertMsg(e.message)
				setSeverity("error")
				setOpen(true)
			}
		} else {
			setAlertMsg("Пароли не совпадают")
			setSeverity("error")
			setOpen(true)
		}
	}
	return (
		<div className="registration-panel">
			<div className="input-panel">
				<TextField
					className="data-input"
					id="nickname"
					type="nickname"
					name="nickname"
					onChange={changeHandler}
					label="Login"
				/>
				<TextField
					className="data-input"
					id="email"
					type="email"
					name="email"
					onChange={changeHandler}
					label="Email"
				/>
				<TextField
					className="data-input"
					id="password"
					type="password"
					name="password"
					onChange={changeHandler}
					label="Password"
				/>
				<TextField
					className="data-input"
					type="password"
					name="repeatedPassword"
					onChange={changeHandler}
					label="Repeat password"
				/>
        <TextField
          className="data-input"
          type="text"
          name="accessKey"
          onChange={changeHandler}
          label="Enter special key"
        />
			</div>
			<div className="button-panel">
				<div className="row-js-btw">
					<Link to="/login">
						<Button className="registration-button">Back to login</Button>
					</Link>
					<Button className="registration-button" onClick={registerHandler} disabled={loading}>
						Register
					</Button>
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

export default RegistrationPanel
