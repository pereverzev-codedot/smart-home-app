import React from "react"

import ControlBlock from "../control-block"
import "./control-panel.css"

const ControlPanel = () => {
	return (
		<div className="control-panel">
			<ControlBlock />
			<ControlBlock />
			<ControlBlock />
			<ControlBlock />
		</div>
	)
}

export default ControlPanel
