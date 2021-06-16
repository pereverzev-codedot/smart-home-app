import * as React from "react"
import SettingsMain from "../components/settings-main"

const SettingsPage = () => {
  React.useEffect(()=>{
    document.title = "SmartHomeApp - Настройки"
  })
	return <SettingsMain />
}
export default SettingsPage
