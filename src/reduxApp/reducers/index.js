import { combineReducers } from "redux";
import authentication from "./authentication";
import messages from "./messages";
import app from "./app";
import account from "./account";

export default combineReducers({
    authentication,
    messages,
    app,
    account,
});
