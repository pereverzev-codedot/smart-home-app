import * as React from "react"
import "./user-widget.css"

export default function UserWidget() {
	return (
		<div className="user-widget">
			<div className="user-img-wrapper">
				<img src="https://via.placeholder.com/150" alt="User inform" className="user-img" />
			</div>
			<div className="user-info-text">
				<span>MitsuruYano</span>
				<span>ghostsword2409@gmail.com</span>
				<span>My sweet home</span>
			</div>
		</div>
	)
}
