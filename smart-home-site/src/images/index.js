import React from 'react'
import PropTypes from 'prop-types'
// import ThemeContext from '../context/ThemeContext'
import theme from "../context/ThemeContext";

export default function Image({imgFile}) {
  return <img src={`./images/system-icons/${theme}/${imgFile}.svg`} alt="nav-btn"/>
}

Image.propTypes = {
   imgFile: PropTypes.string.isRequired
}


const AlertIcon = `./images/system-icons/${theme}/Alert.svg`
const MessageIcon = `./images/system-icons/${theme}/Message.svg`
const WarningIcon = `./images/system-icons/${theme}/Warning.svg`

export {AlertIcon, MessageIcon, WarningIcon}
