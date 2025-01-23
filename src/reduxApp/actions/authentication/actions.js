
import axios from "axios";

import {
	USER_LOADED,

	SIGN_IN_SUCCESS,
	SIGN_IN_FAIL,
	LOGOUT,

	SIGN_UP_SUCCESS,
	SIGN_UP_FAIL,

	CHANGE_PASSWORD_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_CONFIRM_SUCCESS,
} from "./types";

import { LOAD_USER } from "../account/types";

import {
	LOADING_ON,
	LOADING_OFF,

	USER_LOADING_ON,
	USER_LOADING_OFF,

	SET_REDIRECT,
} from "../app/types";

import { raiseErrors, createMessage } from "../messages/actions";

import {
	EP_LOAD_USER,
	EP_SIGN_IN,
	EP_LOGOUT,
	EP_SIGN_UP,

	EP_CHANGE_PASSWORD,
	EP_RESET_PASSWORD,
	EP_RESET_PASSWORD_CONFIRM,
} from "../../../AppEndpoints";

import { tokenConfigurator } from "../../../Utilities";
import { getUrl } from "../../../AppUrls";


export const loadUser = () => (dispatch, getState) => {
	dispatch({type: USER_LOADING_ON});

	axios.get(EP_LOAD_USER, tokenConfigurator(getState))
		.then(response => {
			dispatch({
				type: LOAD_USER,
				payload: response.data
			})
			dispatch({type: USER_LOADED});
			dispatch({type: USER_LOADING_OFF});
		}).catch(error => {
			// Do nothing if we fail to load the user
			dispatch({type: USER_LOADING_OFF});
		})
}


export const signIn = (username, password) => dispatch => {
	dispatch({type: LOADING_ON});

	const config = {
		headers: {
			"Content-Type": "application/json",
		}
	}
	const body = JSON.stringify({username, password});
	axios.post(EP_SIGN_IN, body, config)
		.then(response => {
			dispatch({
				type: SIGN_IN_SUCCESS,
				payload: response.data.token
			});
			dispatch({
				type: LOAD_USER,
				payload: response.data.user
			})
			dispatch({type: LOADING_OFF});

			dispatch({
				type: SET_REDIRECT,
				payload: getUrl("DASHBOARD"),
			})
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status))
			}
			dispatch({type: SIGN_IN_FAIL});
		})

	
}


export const signUp = (formData) => dispatch => {
	dispatch({type: LOADING_ON});

	const config = {
		headers: {
			"Content-Type": "application/json",
		}
	}
	const body = JSON.stringify(formData);
	axios.post(EP_SIGN_UP, body, config)
		.then(response => {
			dispatch({
				type: SIGN_UP_SUCCESS,
				payload: response.data.token
			});
			dispatch({
				type: LOAD_USER,
				payload: response.data.user
			})
			dispatch({type: LOADING_OFF});

			dispatch({
				type: SET_REDIRECT,
				payload: getUrl("DASHBOARD"),
			})
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status))
			}
			dispatch({type: SIGN_UP_FAIL});	
		})
}


export const logout = () => (dispatch, getState) => {
	axios.post(EP_LOGOUT, null, tokenConfigurator(getState))
		.then(response => {
			dispatch({
				type: LOGOUT,
				payload: response.data
			});
		}).catch(error => {
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status))
			}
		})
}


export const changePassword = (formData) => (dispatch, getState) => {
	dispatch({type: LOADING_ON});

	const body = JSON.stringify(formData);
	axios.post(EP_CHANGE_PASSWORD, body, tokenConfigurator(getState))
		.then(response => {
			dispatch({type: LOADING_OFF});
			dispatch(createMessage("Password updated successfully", "SUCCESS"))
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status))
			}
		})
}


export const resetPassword = (formData) => dispatch => {
	dispatch({type: LOADING_ON});

	const config = {
		headers: {
			"Content-Type": "application/json",
		}
	}	
	const body = JSON.stringify(formData);
	axios.post(EP_RESET_PASSWORD, body, config)
		.then(response => {
			dispatch({type: LOADING_OFF});
			dispatch({
				type: SET_REDIRECT,
				payload: getUrl("RESET_PASSWORD_DONE"),
			})
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status))
			}
		})
}


export const resetPasswordConfirm = (formData) => dispatch => {
	dispatch({type: LOADING_ON});

	const config = {
		headers: {
			"Content-Type": "application/json",
		}
	}
	const body = JSON.stringify(formData);
	axios.post(EP_RESET_PASSWORD_CONFIRM, body, config)
		.then(response => {
			dispatch({type: LOADING_OFF});
			dispatch({
				type: SET_REDIRECT,
				payload: getUrl("RESET_PASSWORD_CONFIRM_DONE"),
			})			
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			if (error.response) {
				dispatch(raiseErrors(error.response.data, error.response.status))
			}
		})
}

