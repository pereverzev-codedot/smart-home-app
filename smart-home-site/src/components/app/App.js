import React from "react"
// import { useStore } from "react-redux"
import { AuthContext } from "../../context/AuthContext"

import { useAuth } from "../../hooks/auth.hook"
import { useRoutes } from "../../routes"
import "./app.css"

const App = () => {
	const { token, login, logout, userId } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)
  // const store = useStore()
	return (
		<AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
			<div>{routes}</div>
			<div className="dev-label">
				<div>HuskyDuckStudio</div>
				<div>Project in development</div>
			</div>
		</AuthContext.Provider>
	)
}
export default App
