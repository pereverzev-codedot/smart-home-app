import * as React from "react"
import NotificationItem from "./notification-item/notification-item"
import { useHttp } from "../../../hooks/http.hook"
import "./notifications-widget.css"

export default function NotificationWidget() {
	const [messages, setMessages] = React.useState([])
	const { request } = useHttp()

	const getWarnings = React.useCallback(async () => {
		try {
			const fetched = await request(`/api/link/warnings`, "GET", null)
			setMessages(fetched.slice(fetched.length - 10))
		} catch (e) {
			console.log(e)
		}
	}, [request])



	React.useEffect(() => {
		getWarnings()
	}, [getWarnings ])
	return (
		<div className="notifications-widget">
			<div className="notification-list">
				{messages.map((el) => (
					<NotificationItem date={el.date} type={el.type} msg={el.message} key={el._id} />
				))}
			</div>
		</div>
	)
}
