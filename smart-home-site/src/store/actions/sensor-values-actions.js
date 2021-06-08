import {
	FETCH_SENSOR_VALUES_FAILURE,
	FETCH_SENSOR_VALUES_SUCCESS,
	FETCH_SENSOR_VALUES_REQUEST,
} from "../types"

const sensorValueLoaded = (sensorValues) => {
	return {
		type: FETCH_SENSOR_VALUES_SUCCESS,
		payload: sensorValues,
	}
}

const sensorValueRequested = (sensorValues) => {
	return {
		type: FETCH_SENSOR_VALUES_REQUEST,
	}
}

const sensorValueFailed = (err) => {
	return {
		type: FETCH_SENSOR_VALUES_FAILURE,
		payload: err,
	}
}

export { sensorValueFailed, sensorValueRequested, sensorValueLoaded }
