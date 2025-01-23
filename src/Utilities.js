import { useRef, useEffect } from "react";

export const usePrevious = value => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export const tokenConfigurator = getState => {
	const token =  getState().authentication.token;
	const config = {
		headers: {
			"Content-Type": "application/json",
		}
	}
	if (token) config.headers["Authorization"] = `Token ${token}`;
	return config
}
