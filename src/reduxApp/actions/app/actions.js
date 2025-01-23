import { RESET_REDIRECT } from "./types";


export const resetRedirect = () => (dispatch, getState) => {
	const redirect =  getState().app.redirect;
	dispatch({ type: RESET_REDIRECT })
	return redirect;
}
