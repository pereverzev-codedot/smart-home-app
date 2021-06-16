import * as React from "react"
import AccountPanel from "../account-panel"
import AccessKeysStgPanel from "../settings-panel"
import HomeSettingsPanel from "../home-settings-panel"
import "./settings-main.css"

const SettingsMain = () => {
	return (
		<div className="settings-main">
			<AccountPanel />
			<HomeSettingsPanel />
			<AccessKeysStgPanel />
		</div>
	)
}

export default SettingsMain
