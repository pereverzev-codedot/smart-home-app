import React, { createContext } from "react"
import PropTypes from "prop-types"
import { useHttp } from "../hooks/http.hook"

const { Provider, Consumer } = createContext()

const ThemeContextProvider = (props) => {
	const [theme, setTheme] = React.useState("light")

	const { request } = useHttp()

	React.useEffect(() => {
		setTimeout(() => {
			const themeFromLocal = localStorage.getItem("theme")
			if (themeFromLocal) {
				setTheme(themeFromLocal)
			}
		}, 3000)
	}, [])

	const sendNewTheme = (currTheme) => {
		try {
			const { email } = JSON.parse(localStorage.getItem("userData"))
			console.log(email)
			const tempTheme = currTheme === "dark" ? "light" : "dark"
			localStorage.setItem("theme", tempTheme)
			request(`/api/link/user`, "POST", {
				email,
				theme: tempTheme,
			})
		} catch (e) {
			console.log(e)
		}
	}

	const setThemeLocal = () => {
		setTimeout(() => {
			const themeFromLocal = localStorage.getItem("theme")
			if (themeFromLocal) {
				setTheme(themeFromLocal)
			}
		}, 3000)
	}

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark")
		sendNewTheme(theme)
	}

	return <Provider value={{ theme, toggleTheme, setThemeLocal }}>{props.children}</Provider>
}

ThemeContextProvider.propTypes = {
	children: PropTypes.any.isRequired,
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer }
