import React from "react"
import { Route, Switch, Redirect } from "react-router"

import { useRoutes } from "../../routes"
import "./app.css"

const App = () => {
	const routes = useRoutes(false)
	return <div>{routes}</div>
}
export default App
