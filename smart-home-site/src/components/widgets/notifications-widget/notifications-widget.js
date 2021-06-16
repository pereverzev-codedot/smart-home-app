import * as React from "react"
import PropTypes from  "prop-types"
import {Pagination} from "@material-ui/lab";
import NotificationItem from "./notification-item/notification-item"
import { useHttp } from "../../../hooks/http.hook"
import "./notifications-widget.css"

export default function NotificationWidget({pagination}) {
  const [showFrom, setShowFrom] = React.useState(10)
	const [messages, setMessages] = React.useState([])
  const [allMessages, setAllMessages] = React.useState([])
	const { request } = useHttp()

	const getWarnings = React.useCallback(async () => {
		try {
			const fetched = await request(`/api/link/warnings`, "GET", null)
			setAllMessages(fetched)
		} catch (e) {
			console.log(e)
		}
	}, [request])



	React.useEffect(() => {
		let mounted = true
		let timerValuesId
		if (mounted) {
			setTimeout(() => {
				getWarnings()
			}, 1000)
			timerValuesId = setInterval(() => {
				getWarnings()
			}, 1000)
		}
		return function cleanup() {
			clearInterval(timerValuesId)
			mounted = false
		}
	}, [getWarnings])

	React.useEffect(() => {
		getWarnings()
	}, [getWarnings])

  React.useEffect(()=>{
    setMessages(allMessages.slice(allMessages.length-showFrom, allMessages.length-showFrom+10))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMessages])


	return (
		<div className="notifications-widget">
			<div className="notification-list">
				{messages.map((el) => (
					<NotificationItem date={el.date} type={el.type} msg={el.message} key={el._id} />
				)).reverse()}
			</div>
      {pagination ? <Pagination variant="outlined" onChange={(e, num) => setShowFrom(num*10)} shape="rounded" boundaryCount={2} count={Math.round(allMessages.length / 10)}/> : null }
		</div>
	)
}

NotificationWidget.propTypes ={
  pagination: PropTypes.bool
}

NotificationWidget.defaultProps = {
  pagination: false
}

