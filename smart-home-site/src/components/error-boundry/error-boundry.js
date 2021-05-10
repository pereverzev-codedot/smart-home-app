import React, { Component } from "react"
import PropTypes from "prop-types"

import ErrorIndicator from "../error-indicator"

export default class ErrorBoundry extends Component {
	constructor() {
		super()
		this.state = {
			hasError: false,
		}
	}

	componentDidCatch() {
		this.setState({ hasError: true })
	}

	render() {
		return this.state.hasError ? ErrorIndicator() : this.props.children
	}
}

ErrorBoundry.propTypes = {
	children: PropTypes.any.isRequired,
}
