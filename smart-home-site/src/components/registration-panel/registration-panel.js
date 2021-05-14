import React from "react"
import { TextField, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const RegistrationPanel = () => {
	return (
		<div className="registration-panel">
			<div className="input-panel">
				<TextField className="data-input" label="Enter Login" />
				<TextField className="data-input" label="Password" />
				<TextField className="data-input" label="Email" />
				<TextField className="data-input" label="Telephone number" />
				<TextField className="data-input" label="Repeat password" />
			</div>
			<div className="button-panel">
				<div>
					<Link to="/login">
						<Button className="registration-button">Back to login</Button>
					</Link>
					<Button className="registration-button">Register</Button>
				</div>
			</div>
		</div>
	)
}

export default RegistrationPanel
