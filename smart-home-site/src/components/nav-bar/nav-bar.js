import * as React from "react"
import { Link } from "react-router-dom"
import "./nav-bar.css"
import {
  FirstFloorIcon,
  GarageIcon,
  GraphsIcon,
  HomeIcon, NotificationIcon,
  OutsideIcon,
  SecondFloorIcon
} from "../../images";


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
              <div className="nav-item"><img alt='Main page' src={HomeIcon}/> </div>
						</Link>
						<Link to="/first-floor">
              <div className="nav-item "><img src={FirstFloorIcon} alt="First floor page"/> </div>
						</Link>
						<Link to="/second-floor">
              <div className="nav-item "><img src={SecondFloorIcon} alt="Second floor page"/> </div>
						</Link>
            <Link to="/garage">
              <div className="nav-item "><img src={GarageIcon} alt="Garage page"/></div>
						</Link>
						<Link to="/outside">
              <div className="nav-item "><img src={OutsideIcon} alt="Outside page"/> </div>
						</Link>
						<Link to="/graphics">
              <div className="nav-item "><img src={GraphsIcon} alt="Graphs page"/></div>
						</Link>
						<Link to="/notifications">
              <div className="nav-item "><img src={NotificationIcon} alt="Notification page"/> </div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavBar
