import React from "react"
import { TextField, Button } from "@material-ui/core"

const AccountPanel = () => {
	return (
		<div className="account-panel">
			<div className="account-info">
				<img alt="some" className="account-image" />
				<span className="account-info">John Lebovski</span>
				<span className="account-info">Johnlebovski@mail.com</span>
				<span className="account-info">+375(33)3178356</span>
			</div>
			<div className="change-password">
				<TextField className="change-pass-input" label="Old password" />
				<TextField className="change-pass-input" label="New password" />
				<TextField className="change-pass-input" label="Repeat new password" />
				<Button className="change-pass-button">Change password</Button>
			</div>
		</div>
	)
}

export default AccountPanel
