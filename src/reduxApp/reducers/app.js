import { 
	LOADING_ON,
	LOADING_OFF,

	USER_LOADING_ON,
	USER_LOADING_OFF,

	RESET_REDIRECT,
	SET_REDIRECT,

} from "../actions/app/types";

const initialState = {
	loading: false,
	userLoading: false,

	redirect: null,
}

export default function(state = initialState, action) {
	switch(action.type) {

		case LOADING_ON:
			return {
				...state,
				loading: true,
			};
		case LOADING_OFF:
			return {
				...state,
				loading: false,
			};

		case USER_LOADING_ON:
			return {
				...state,
				userLoading: true,
			};
		case USER_LOADING_OFF:
			return {
				...state,
				userLoading: false,
			};

		case SET_REDIRECT:
			return {
				...state,
				redirect: action.payload,
			}

		case RESET_REDIRECT:
			return {
				...state,
				redirect: null,
			}

		default:
			return state;
	}
}
