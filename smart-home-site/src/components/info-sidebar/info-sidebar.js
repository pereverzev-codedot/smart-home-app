import React, { useState } from "react"
import "./info-sidebar.css"

const InfoSideBar = () => {
	const [open, setOpen] = useState(false)

	const openHandler = () => {
		setOpen(!open)
	}

	return (
		<div className={`right-bar ${open && "active"}`}>
			<span className="right-bar-toggle" role="button" tabIndex={0} onClick={openHandler}>
				<span className="right-bar-toggle-line" />
			</span>
			<div className="right-bar-section">RightSideBar</div>
		</div>
	)
}

export default InfoSideBar
