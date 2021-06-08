import * as React from "react"
import NoificationWidget from "../components/widgets/notifications-widget"

export default function NotificationsPage() {
  React.useEffect(()=>{
    document.title = "Notification page"
  })
	return <NoificationWidget />
}
