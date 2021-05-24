import React from "react"
import { Route, Switch, Redirect } from "react-router"

import NavBar from "./components/nav-bar"
import InfoSideBar from "./components/info-sidebar"
import { SettingsPage, MainPage, LoginPage, RegistrationPage } from "./pages"

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<div className="main-content">
					<NavBar />
					<div className="container">
						<Route path="/" exact component={MainPage} />
						<Route path="/first-floor" exact component={SettingsPage} />
						<Route path="/second-floor" exact component={SettingsPage} />
						<Route path="/outside" exact component={SettingsPage} />
						<Route path="/graphics" exact component={SettingsPage} />
						<Route path="/notifications" exact component={SettingsPage} />
						<Route path="/settings" exact component={SettingsPage} />
					</div>
					<InfoSideBar />
				</div>
				<Redirect to="/" />
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact component={LoginPage} />
			<Route path="/register" exact component={RegistrationPage} />
			<Redirect to="/" />
		</Switch>
	)
}
