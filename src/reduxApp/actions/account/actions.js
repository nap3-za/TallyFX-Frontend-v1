import axios from "axios";

import {
	UPDATE_ACCOUNT_SUCCESSFUL,
	UPDATE_ACCOUNT_UNSUCCESSFUL,

	PROFILE_IMAGE_UPLOAD_SUCCESSFUL,

} from "./types";

import {
	LOADING_ON,
	LOADING_OFF,
} from "../app/types";

import {
	RAISE_ERRORS,
} from "../messages/types";

import {
	EP_UPDATE_ACCOUNT,
	EP_GET_ACCOUNT,
} from "../../../AppEndpoints";

import { tokenConfigurator } from "../../../Utilities";

import { raiseErrors, createMessage } from "../messages/actions";


export const updateAccount = (updateFormData, userId) => (dispatch, getState) => {
	dispatch({type: LOADING_ON});

	const token =  getState().authentication.token;
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		}
	}
	if (token) config.headers["Authorization"] = `Token ${token}`;

	const UPDATE_ENDPOINT = EP_UPDATE_ACCOUNT + userId + "/";
	axios.patch(UPDATE_ENDPOINT, updateFormData, config)
		.then(response => {
			dispatch({
				type: UPDATE_ACCOUNT_SUCCESSFUL,
				payload: response.data,
			});
			dispatch(createMessage("Account updated"));
			dispatch({type: LOADING_OFF});
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status));
			}
		})
}

export const getAccount = (populateResponse, accountId) => (dispatch, getState) => {
	axios.get(EP_GET_ACCOUNT + accountId + "/", tokenConfigurator(getState))
		.then(response => {
			dispatch({type: LOADING_OFF});
			populateResponse({
				...response.data,
				loading: false,
			});

		}).catch(error => {
			dispatch({type: LOADING_OFF});
			dispatch(raiseErrors(error.response.data, error.response.status));
			populateResponse(null);
		})
}