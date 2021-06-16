import * as React from "react"
import { TextField, Button, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { useHttp } from "../../hooks/http.hook"
import "./account-panel.css"

const AccountPanel = () => {
	const [open, setOpen] = React.useState(false)
	const [alertMsg, setAlertMsg] = React.useState("Register success")
	const [severity, setSeverity] = React.useState("success")
	const [form, setForm] = React.useState({
		oldPassword: "",
		newPassword: "",
		repeatedPassword: "",
	})
  const [user, setUser] = React.useState({email: "", nickname: ""})

	const { request } = useHttp()

  React.useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("userData"))
    setUser({email: userData.email, nickname: userData.nickname })
  }, [])

	const savePassword = async () => {
		if (form.repeatedPassword === form.newPassword) {
			try {
				const { email } = JSON.parse(localStorage.getItem("userData"))
				const data = await request("api/auth/change-pass", "POST", {
					email,
					password: form.oldPassword,
					passwordNew: form.newPassword,
				})
				setAlertMsg(data.message)
				setSeverity("success")
				setOpen(true)
			} catch (e) {
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

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return
		}

		setOpen(false)
	}

	const savePasswordHandler = () => {
		savePassword()
	}

	return (
		<div className="account-panel">
			<div className="account-info">
				<div className="account-info-block">
					<span className="account-info__text">{user.nickname}</span>
					<span className="account-info__text">{user.email}</span>
				</div>
			</div>
			<div className="change-password">
				<TextField
					id="oldPassword"
					type="oldPassword"
					name="oldPassword"
					onChange={changeHandler}
					className="change-pass-input"
					label="Старый пароль"
				/>
				<TextField
					id="newPassword"
					type="newPassword"
					name="newPassword"
					onChange={changeHandler}
					className="change-pass-input"
					label="Новый пароль"
				/>
				<TextField
					id="repeatedPassword"
					type="repeatedPassword"
					name="repeatedPassword"
					onChange={changeHandler}
					className="change-pass-input"
					label="Повторите новый пароль"
				/>
				<Button onClick={savePasswordHandler} className="change-pass-button">
					Сменить пароль
				</Button>
			</div>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity}>
					{alertMsg}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default AccountPanel
