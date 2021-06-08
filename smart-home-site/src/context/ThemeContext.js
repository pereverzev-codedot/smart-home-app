import { createContext } from "react"

const changeTheme =() =>{}

export const ThemeContext = createContext({
  theme: "light",
})


const theme = "dark";
export default theme;
