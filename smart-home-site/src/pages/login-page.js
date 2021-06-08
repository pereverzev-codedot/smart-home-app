import * as React from "react"
import LoginPanel from "../components/login-panel"

const LoginPage = () => {
  React.useEffect(()=>{
    document.title = "Login page"
  })
	return <LoginPanel />
}
export default LoginPage
