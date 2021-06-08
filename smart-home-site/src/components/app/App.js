import * as React from "react"
// import { useStore } from "react-redux"
// import {ThemeContext} from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext"

import { useAuth } from "../../hooks/auth.hook"
import { useRoutes } from "../../routes"
import theme from "../../context/ThemeContext";
import "./app.css"

const App = () => {
	const { token, login, logout, userId } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)
	// const store = useStore()
	return (
		<AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>

      <link rel="stylesheet" href={`./styles/${theme}-theme.css`}/>
			<div>{routes}</div>
			<div className="dev-label">
				<div>HuskyDuckStudio</div>
				<div>Project in development</div>
			</div>

		</AuthContext.Provider>
	)
}
export default App
