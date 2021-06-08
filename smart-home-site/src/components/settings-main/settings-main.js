import * as React from "react"
import AccountPanel from "../account-panel"
import UserSettingsPanel from "../settings-panel"
import HomeSettingsPanel from "../home-settings-panel";
import "./settings-main.css"

const SettingsMain = () => {
	return (
		<div className="settings-main">
			<AccountPanel />
			<UserSettingsPanel />
			<HomeSettingsPanel />
		</div>
	)
}

export default SettingsMain
