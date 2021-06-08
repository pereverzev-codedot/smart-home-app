import {
	FETCH_WEATHER_HOURLU_FAILURE,
	FETCH_WEATHER_HOURLU_REQUEST,
	FETCH_WEATHER_HOURLU_SUCCESS,
} from "../types"

const weatherHourluLoaded = (graphs) => {
	return {
		type: FETCH_WEATHER_HOURLU_SUCCESS,
		payload: graphs,
	}
}

const weatherHourluLoadFailure = (err) => {
	return {
		type: FETCH_WEATHER_HOURLU_FAILURE,
		payload: err,
	}
}
const weatherHourluRequested = () => {
	return { type: FETCH_WEATHER_HOURLU_REQUEST }
}

export { weatherHourluLoaded, weatherHourluLoadFailure, weatherHourluRequested }
