import { FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS } from "../types"

const messagesLoaded = (newMessages) => {
	return {
		type: FETCH_MESSAGES_SUCCESS,
		payload: newMessages,
	}
}
const messagesErrored = (err) => {
	return {
		type: FETCH_MESSAGES_FAILURE,
		payload: err,
	}
}
const messagesRequested = () => {
	return {
		type: FETCH_MESSAGES_REQUEST,
	}
}

export { messagesLoaded, messagesRequested, messagesErrored }
