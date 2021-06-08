import {
	FETCH_WEATHER_DAILY_FAILURE,
	FETCH_WEATHER_DAILY_REQUEST,
	FETCH_WEATHER_DAILY_SUCCESS,
} from "../types"

const weatherDailyLoaded = (graphs) => {
	return {
		type: FETCH_WEATHER_DAILY_SUCCESS,
		payload: graphs,
	}
}

const weatherDailyLoadFailure = (err) => {
	return {
		type: FETCH_WEATHER_DAILY_FAILURE,
		payload: err,
	}
}
const weatherDailyRequested = () => {
	return { type: FETCH_WEATHER_DAILY_REQUEST }
}

export { weatherDailyLoaded, weatherDailyLoadFailure, weatherDailyRequested }
