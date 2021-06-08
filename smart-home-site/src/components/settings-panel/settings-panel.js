import * as React from "react"
import { Switch } from "@material-ui/core"
import "./settings-panel.css"
import {useHttp} from "../../hooks/http.hook";

const UserSettingsPanel = () => {
  const { request } = useHttp()
  const saveSettings = React.useCallback(async () => {
    try {
      const {email} = JSON.parse(localStorage.getItem("userData"))
      console.log(email)
      const fetched = await request(`/api/link/user`, "POST", {email, settings:[{darkTheme: true},{somethingElse: true}]} )
      console.log(fetched)
    } catch (e) {
      console.log(e)
    }
  }, [request])

  const saveSettingsHandler = () =>{
    saveSettings()
  }

	return (
		<div className="settings-panel">
			<div className="settings-change">
				<div className="switch-container">
					<span className="switch-text">Dark theme</span>
					<Switch classname="switch" />
				</div>
			</div>
			<div className="app-info">
				<span className="info-text">Инфа о проге</span>
			</div>
      <div role="button" tabIndex={0} onClick={saveSettingsHandler}>
        Save
      </div>
		</div>
	)
}

export default UserSettingsPanel
