import * as React from "react"
import PropTypes from "prop-types"
import { Slider } from "@material-ui/core"
import { useHttp } from "../../../hooks/http.hook"
import CBLoader from "./cb-loader"
import Loader from "../../loader"

export default function ControlBlockSlider({ el, maxValueS }) {
	const { request } = useHttp()
	const [loading, setLoading] = React.useState(false)
	const [stateValue, setStateValue] = React.useState(el.value)
	const SendChangedOption = (value, key) => {
		try {
			setLoading(true)
			request(`/api/link/change`, "POST", { value, key })
				.then((res) => {
					setLoading(false)
					console.log(res)
				})
				.catch((err) => {
					console.log(err)
				})
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className="sensor-switch slidable-switch">
			{el === undefined ? (
				<Loader />
			) : (
				<>
					<span className="switch-text">{el.title}</span>
					{loading ? (
						<CBLoader />
					) : (
						<Slider
							step={1}
							min={1}
							max={maxValueS}
							value={stateValue}
							valueLabelDisplay="auto"
							onChange={(e, value) => setStateValue(value)}
							onChangeCommitted={() => SendChangedOption(el.key, stateValue)}
						/>
					)}
				</>
			)}
		</div>
	)
}

ControlBlockSlider.propTypes = {
	el: PropTypes.object.isRequired,
  maxValueS: PropTypes.number.isRequired
}
