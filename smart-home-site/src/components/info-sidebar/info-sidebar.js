import * as React from "react"
import { Link, useHistory } from "react-router-dom"
import DateWidget from "../widgets/date-widget"
import NotificationWidget from "../widgets/notifications-widget"
import UserWidget from "../widgets/user-widget"
import WeatherWidget from "../widgets/weather-widget"
import { AuthContext } from "../../context/AuthContext"
import { ThemeContextConsumer } from "../../context/ThemeContext"
import "./info-sidebar.css"
import Image from "../../images"

const InfoSideBar = () => {
	const auth = React.useContext(AuthContext)
	const history = useHistory()
	const [open, setOpen] = React.useState(false)
	const openHandler = () => {
		setOpen(!open)
	}
	const logoutHandler = (event) => {
		event.preventDefault()
		localStorage.removeItem("userData")
		localStorage.removeItem("theme")
		auth.logout()
		history.push("/")
	}
	return (
		<div className={`right-bar ${open && "active"}`}>
			<span className="right-bar-toggle" role="button" tabIndex={0} onClick={openHandler}>
				<span className="right-bar-toggle-line" />
			</span>
			<div className="right-bar-section">
				<div className="right-bar-content">
					<UserWidget />
					<WeatherWidget />
					<DateWidget offset="10800" />
					<NotificationWidget />
				</div>
				<div className="right-bar-bottom-bar">
					<ThemeContextConsumer>
						{(context) => (
							<div
								className="bottom-bar_element"
								onClick={context.toggleTheme}
								tabIndex={0}
								role="button"
							>
								<Image imgFile="Theme" />
							</div>
						)}
					</ThemeContextConsumer>

					<Link to="/settings" className="bottom-bar_element">
						<Image imgFile="Union" />
					</Link>
					<a className="bottom-bar_element" onClick={logoutHandler} tabIndex={0} role="button">
						<Image imgFile="Logout" />
					</a>
				</div>
			</div>
		</div>
	)
}

export default InfoSideBar
