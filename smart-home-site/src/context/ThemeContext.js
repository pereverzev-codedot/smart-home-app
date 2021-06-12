import React, { createContext } from "react"

const changeTheme =() =>{}

export const ThemeContext = createContext({
  theme: "light",
})


const theme = "light";
export default theme;
