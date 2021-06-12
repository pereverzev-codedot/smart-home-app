import * as React from "react"
import { Link } from "react-router-dom"
import "./nav-bar.css"
import Image from "../../images";


const NavBar = () => {
	const [active, setActive] = React.useState(false)

	const openHandler = () => {
		setActive(!active)
	}
	return (
		<div className={`nav-bar ${active && "active"}`}>
			<span className="nav-bar-toggle" role="button" tabIndex={0} onClick={openHandler}>
				<span className="nav-bar-toggle-line" />
			</span>
			<div className="nav-bar-section">
				<div className="nav-bar-content">
					<div className="nav-panel">
						<Link to="/">
              <div className="nav-item"><Image imgFile="Home"/></div>
						</Link>
						<Link to="/first-floor">
              <div className="nav-item "><Image imgFile="1st"/> </div>
						</Link>
						<Link to="/second-floor">
              <div className="nav-item "><Image imgFile="2nd"/> </div>
						</Link>
            <Link to="/garage">
              <div className="nav-item "><Image imgFile="Garage"/></div>
						</Link>
						<Link to="/outside">
              <div className="nav-item "><Image imgFile="Outside"/> </div>
						</Link>
						<Link to="/graphics">
              <div className="nav-item "><Image imgFile="Graphs"/></div>
						</Link>
						<Link to="/notifications">
              <div className="nav-item "><Image imgFile="Notifications"/></div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavBar
