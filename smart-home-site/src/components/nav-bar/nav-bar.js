import React from "react"
import { Link } from "react-router-dom"
import "./nav-bar.css"

const NavBar = () => {
	return (
		<div className="nav-panel">
			<Link to="/">
				<div className="nav-item">MainPage</div>
			</Link>
			<Link to="/first-floor">
				<div className="nav-item">FirstFloor</div>
			</Link>
			<Link to="/second-floor">
				<div className="nav-item">SecondFloor</div>
			</Link>
			<Link to="/outside">
				<div className="nav-item">Outside</div>
			</Link>
			<Link to="/settings">
				<div className="nav-item">Settings</div>
			</Link>
		</div>
	)
}

export default NavBar
