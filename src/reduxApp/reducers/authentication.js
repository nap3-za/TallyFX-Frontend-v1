import {
	USER_LOADED,
	AUTHENTICATION_ERROR,
	SIGN_IN_SUCCESS,
	SIGN_IN_FAIL,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAIL,
	LOGOUT,

	CHANGE_PASSWORD_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_CONFIRM_SUCCESS,
} from "../actions/authentication/types";
// import "flowbite";


const token = localStorage.getItem("restapitoken")
const initialState = {
	token,
	isAuthenticated: false,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SIGN_UP_FAIL:
		case LOGOUT:
		case SIGN_IN_FAIL:
		case AUTHENTICATION_ERROR:
			localStorage.removeItem("restapitoken");
			return {
				token: null,
				isAuthenticated: false,
			};

		case SIGN_UP_SUCCESS:
		case SIGN_IN_SUCCESS:
			localStorage.setItem("restapitoken", action.payload);
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
			};

		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
			}


		default:
			return state;
	}
}
