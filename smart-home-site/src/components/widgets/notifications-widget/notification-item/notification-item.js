import * as React from "react"
import PropTypes from "prop-types"
import Image from "../../../../images"

export default function NotificationItem(props) {
	const [active, setActive] = React.useState(false)
	const [icon, setIcon] = React.useState(null)
	const [text, setText] = React.useState(null)
	const openHandler = () => {
		setActive(!active)
	}
	const getStrData = (day) => {
		return `${day.getHours()}:${day.getMinutes()} ${day.getDate()}-${day.getMonth() + 1}`
	}
	const { msg, type, date } = props
	const dateFormated = new Date(Date.parse(date))
	React.useEffect(() => {
		switch (type) {
			case "warning": {
				setText("Длительная угроза!")
				return setIcon("Warning")
			}
			case "alert": {
				setText("Внимание!")
				return setIcon("Alert")
			}
			case "message": {
				setText("Сообщение!")
				return setIcon("Message")
			}
			default: {
				return null
			}
		}
	}, [type])
	return (
		<div className={`notification-item ${active && "active"}`}>
			<div role="button" tabIndex={0} className="notification-title" onClick={openHandler}>
				<div className="notification-item__image-wrapper">
					<Image imgFile={icon} />
				</div>
				<span className="notification-item__title">{text}</span>
				<span className="notification-item__date">{getStrData(dateFormated)}</span>
				<span className="notification-toggle" />
			</div>
			<div className="notification-body">{msg}</div>
		</div>
	)
}

NotificationItem.propTypes = {
	msg: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
}
