import * as React from "react"
import "./user-widget.css"

export default function UserWidget() {
  const [user, setUser] = React.useState({email: "", nickname: ""})

  React.useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("userData"))
    setUser({email: userData.email, nickname: userData.nickname })
  }, [])

	return (
		<div className="user-widget">
			<div className="user-info-text">
				<span>{user.nickname}</span>
				<span>{user.email}</span>
			</div>
		</div>
	)
}
