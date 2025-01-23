import { CREATE_MESSAGE, RAISE_ERRORS } from "./types";

export const createMessage = (message, type="SUCCESS") => {
	return {
		type: CREATE_MESSAGE,
		payload: {
			message: {
				message: message,
				type: type,
			}
		}
	}
}

export const raiseErrors = (error, type) => {
	return {
		type: RAISE_ERRORS,
		payload: {
			error: {
				error: error,
				type: type,
			}
		}
	}
}
