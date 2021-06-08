import {
	FETCH_GRAPHS_DATA_FAILURE,
	FETCH_GRAPHS_DATA_SUCCESS,
	FETCH_GRAPHS_DATA_SUCCESS,
} from "../types"

const graphsLoaded = (graphs) => {
	return {
		type: FETCH_GRAPHS_DATA_SUCCESS,
		payload: graphs,
	}
}

const graphsLoadFailure = (err) => {
	return {
		type: FETCH_GRAPHS_DATA_FAILURE,
		payload: err,
	}
}
const graphsRequested = () => {
	return { type: FETCH_GRAPHS_DATA_REQUEST }
}

export { graphsLoaded, graphsRequested, graphsLoadFailure }
