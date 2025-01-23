import { 
	UPDATE_ACCOUNT_SUCCESSFUL,
	PROFILE_IMAGE_UPLOAD_SUCCESSFUL,
	LOAD_USER,

} from "../actions/account/types";

const initialState = {
	user: null
}

export default function(state = initialState, action) {
	switch(action.type) {

		case UPDATE_ACCOUNT_SUCCESSFUL:
		case PROFILE_IMAGE_UPLOAD_SUCCESSFUL:
		case LOAD_USER:
			return {
				...state,
				user: action.payload,
			};

		default:
			return state;
	}
}
