const BASE_ENDPOINT = "http://127.0.0.1:8000/"

export const EP_LOAD_USER = BASE_ENDPOINT + "authentication/account/";
export const EP_SIGN_IN = BASE_ENDPOINT + "authentication/sign-in/";
export const EP_SIGN_UP = BASE_ENDPOINT + "authentication/sign-up/";
export const EP_LOGOUT = BASE_ENDPOINT + "knox-authentication/logout/";

const REST_AUTH = BASE_ENDPOINT + "rest-authentication/";

export const EP_RESET_PASSWORD = REST_AUTH + "password/reset/";
export const EP_RESET_PASSWORD_CONFIRM = REST_AUTH + "password/reset/confirm/";
export const EP_CHANGE_PASSWORD = REST_AUTH + "password/change/";

export const EP_UPDATE_ACCOUNT = BASE_ENDPOINT + "account/app/";
export const EP_GET_ACCOUNT = BASE_ENDPOINT + "account/app/";