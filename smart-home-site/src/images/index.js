import React from "react"
import PropTypes from "prop-types"
import { ThemeContextConsumer } from "../context/ThemeContext"

export default function Image({ imgFile }) {
	return (
		<ThemeContextConsumer>
			{(context) => (
				<img src={`./images/system-icons/${context.theme}/${imgFile}.svg`} alt="nav-btn" />
			)}
		</ThemeContextConsumer>
	)
}

Image.propTypes = {
	imgFile: PropTypes.string.isRequired,
}
