import * as React from "react"
import PropTypes from "prop-types"
import { Switch } from "@material-ui/core"
import { useHttp } from "../../../hooks/http.hook"
import CBLoader from "./loader"
import Loader from "../../loader"

export default function HspBlockItem({ el }) {
	const { request } = useHttp()
	const [loading, setLoading] = React.useState(false)

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
		<div className="sensor-switch">
			{el === undefined ? (
				<Loader />
			) : (
				<>
					<span className="switch-text">{el.title}</span>
					{loading ? (
						<CBLoader />
					) : (
						<Switch
							onClick={() => SendChangedOption(el.key, !el.value)}
							checked={Boolean(el.value)}
						/>
					)}
				</>
			)}
		</div>
	)
}

HspBlockItem.propTypes = {
	el: PropTypes.object.isRequired,
}
