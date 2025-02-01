import { RESET_REDIRECT } from "./types";
import axios from "axios";


import {
	RAISE_ERRORS,
} from "../messages/types";
import {
	LOADING_ON,
	LOADING_OFF,
} from "../app/types";


import { tokenConfigurator, serializeGetData } from "../../../Utilities";

import { raiseErrors, createMessage } from "../messages/actions";


export const resetRedirect = () => (dispatch, getState) => {
	const redirect =  getState().app.redirect;
	dispatch({ type: RESET_REDIRECT })
	return redirect;
}

export const getEvents = (queries) => (dispatch, getState) => {
	const EP_EVENTS = "http://127.0.0.1:8000/clients/?" + serializeGetData(queries);

	axios.get(EP_EVENTS, tokenConfigurator(getState))
		.then(response => {
			dispatch({type: LOADING_OFF});
			console.log(response.data)
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			dispatch(raiseErrors(error.response.data, error.response.status));
		})
}