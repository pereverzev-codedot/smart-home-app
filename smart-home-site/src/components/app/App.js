import * as React from "react"
import { AuthContext } from "../../context/AuthContext"
import { ThemeContextProvider, ThemeContextConsumer } from "../../context/ThemeContext"
import { useAuth } from "../../hooks/auth.hook"
import { useRoutes } from "../../routes"

import "./app.css"

const App = () => {
	const [theme, setThemeTest] = React.useState("light")
	const { token, login, logout, userId } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	// const store = useStore()
	return (
		<AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
			<ThemeContextProvider>
				<ThemeContextConsumer>
					{(context) => (
						<>
							<link rel="stylesheet" href={`./styles/${context.theme}-theme.css`} />
							<div>{routes}</div>
							<div className="dev-label">
								<div>HuskyDuckStudio</div>
								<div>Project in development</div>
							</div>
						</>
					)}
				</ThemeContextConsumer>
			</ThemeContextProvider>
		</AuthContext.Provider>
	)
}
export default App
