import * as React from "react"
import { Route, Switch, Redirect } from "react-router"

import NavBar from "./components/nav-bar"
import InfoSideBar from "./components/info-sidebar"
import {
	SettingsPage,
	MainPage,
	LoginPage,
	RegistrationPage,
	NotificationsPage,
	GraphsPage,
	FirstFloorPage,
	SecondFloorPage,
	OutsidePage,
	GaragePage,
} from "./pages"

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<div className="main-content">
					<NavBar />
					<div className="container">
						<Route path="/" exact component={MainPage} />
						<Route path="/first-floor" exact component={FirstFloorPage} />
						<Route path="/second-floor" exact component={SecondFloorPage} />
						<Route path="/garage" exact component={GaragePage} />
						<Route path="/outside" exact component={OutsidePage} />
						<Route path="/graphics" exact component={GraphsPage} />
						<Route path="/notifications" exact component={NotificationsPage} />
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
