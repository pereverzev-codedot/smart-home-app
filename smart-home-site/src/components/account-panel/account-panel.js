import * as React from "react"
import { TextField, Button } from "@material-ui/core"
import './account-panel.css'

const AccountPanel = () => {
	return (
		<div className="account-panel">
			<div className="account-info">
				<img alt="some" className="account-image" src="" />
				<div className="account-info-block">
          <span className="account-info__text">Some</span>
          <span className="account-info__text">Johnlebovski@mail.com</span>
          <span className="account-info__text">+375(33)3178356</span>
        </div>
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
