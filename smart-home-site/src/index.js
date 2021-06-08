import * as React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./components/app/App"
import ErrorBoundry from "./components/error-boundry"
import "./index.css"

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ErrorBoundry>
				<App />
			</ErrorBoundry>
		</Router>
	</React.StrictMode>,
	document.getElementById("root"),
)
