import * as React from "react"
import "./cb-loader.css"

export default function CBLoader() {
	return (
		<div className="cb-loader-wrapper">
			<div className="lds-ellipsis">
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	)
}
