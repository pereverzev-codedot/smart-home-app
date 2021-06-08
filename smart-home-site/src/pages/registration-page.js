import * as React from "react"
import RegistrationPanel from "../components/registration-panel"

const RegistrationPage = () => {
  React.useEffect(()=>{
    document.title = "Registration"
  })
	return <RegistrationPanel />
}
export default RegistrationPage
