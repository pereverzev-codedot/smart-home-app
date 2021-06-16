import * as React from "react"
import RegistrationPanel from "../components/registration-panel"

const RegistrationPage = () => {
  React.useEffect(()=>{
    document.title = "SmartHomeApp - Регистрация"
  })
	return <RegistrationPanel />
}
export default RegistrationPage
