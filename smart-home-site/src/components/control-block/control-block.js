import * as React from "react"
import { Switch } from "@material-ui/core"
import "./control-block.css"

const ControlBlock = () => {
	return (
		<div className="control-block">
			<div className="sensor-wrapper">
				<div className="wrapper-container">
					<div className="sensor-info">
						<span className="info-text">Temperature</span>
						<span className="info-value">20</span>
					</div>
					<div className="sensor-info">
						<span className="info-text">Temperature</span>
						<span className="info-value">20</span>
					</div>
				</div>
				<div className="wrapper-container">
					<div className="sensor-info">
						<span className="info-text">Temperature</span>
						<span className="info-value">20</span>
					</div>
					<div className="sensor-info">
						<span className="info-text">Temperature</span>
						<span className="info-value">20</span>
					</div>
				</div>
			</div>
			<div className="sensor-switcher">
				<div className="sensor-switch">
					<span className="svitch-text">Light in the room 1</span>
					<Switch />
				</div>
				<div className="sensor-switch">
					<span className="svitch-text">Light in the room 1</span>
					<Switch />
				</div>
				<div className="sensor-switch">
					<span className="svitch-text">Light in the room 1</span>
					<Switch />
				</div>
				<div className="sensor-switch">
					<span className="svitch-text">Light in the room 1</span>
					<Switch />
				</div>
			</div>
		</div>
	)
}

export default ControlBlock
