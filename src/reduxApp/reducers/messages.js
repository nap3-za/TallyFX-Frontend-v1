import { CREATE_MESSAGE, RAISE_ERRORS } from "../actions/messages/types";

const initialState = {
	error: {
		error: null,
		type: null,
	},
	message: {
		message: null,
		type: null,
	}
}

export default function(state = initialState, action) {
	switch(action.type) {

		case RAISE_ERRORS:
		case CREATE_MESSAGE:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
}
