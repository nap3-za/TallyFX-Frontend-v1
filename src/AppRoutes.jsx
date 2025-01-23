import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import Index from "./pages/misc/Index.jsx";
import Dashboard from "./pages/misc/Dashboard.jsx";

import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";

import ResetPassword from "./pages/authentication/password-reset/ResetPassword";
import ResetPasswordDone from "./pages/authentication/password-reset/ResetPasswordDone";
import ResetPasswordConfirm from "./pages/authentication/password-reset/ResetPasswordConfirm";
import ResetPasswordConfirmDone from "./pages/authentication/password-reset/ResetPasswordConfirmDone";

import Account from "./pages/account/Account";
import AccountSettings from "./pages/account/AccountSettings";

import PageNotFound from "./pages/misc/error/PageNotFound";
import Redirect from "./components/misc/Redirect";

import { getUrl } from "./AppUrls";


function AppRoutes(props) {
	const { isAuthenticated } = props;

	const URL_SIGN_IN = getUrl("SIGN_IN", true);
	const URL_SIGN_UP = getUrl("SIGN_UP", true);
	const URL_RESET_PASSWORD = getUrl("RESET_PASSWORD", true);
	const URL_RESET_PASSWORD_DONE = getUrl("RESET_PASSWORD_DONE", true);
	const URL_RESET_PASSWORD_CONFIRM = getUrl("RESET_PASSWORD_CONFIRM", true);
	const URL_RESET_PASSWORD_CONFIRM_DONE = getUrl("RESET_PASSWORD_CONFIRM_DONE", true);
	const URL_ACCOUNT = getUrl("ACCOUNT", true);
	const URL_ACCOUNT_SETTINGS = getUrl("ACCOUNT_SETTINGS", true);


	return (
		<Routes>
			<Route exact path={URL_RESET_PASSWORD} element={<Redirect component={<ResetPassword />} />} />
			<Route exact path={URL_RESET_PASSWORD_DONE} element={<ResetPasswordDone />} />
			<Route exact path={URL_RESET_PASSWORD_CONFIRM} element={<Redirect component={<ResetPasswordConfirm />} />} />
			<Route exact path={URL_RESET_PASSWORD_CONFIRM_DONE} element={<ResetPasswordConfirmDone />} />

			<Route exact path="*" element={<PageNotFound />} />
			{isAuthenticated === false ? <>
				<Route exact path="/" element={<Index />} />
				<Route exact path={URL_SIGN_IN} element={<Redirect component={<SignIn />} />} />
				<Route exact path={URL_SIGN_UP} element={<Redirect component={<SignUp />} />} />
			</> : <>
				<Route exact path="/" element={<Dashboard />} />

				<Route exact path={URL_ACCOUNT} element={<Account />} />
				<Route exact path={URL_ACCOUNT_SETTINGS} element={<AccountSettings />} />

				{/* Redirects */}
				<Route exact path={URL_SIGN_IN} element={<Navigate to="/" />} />
				<Route exact path={URL_SIGN_UP} element={<Navigate to="/" />} />

			</>}
			
		</Routes>
	)
}

AppRoutes.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
})

export default connect(mapStateToProps, null)(AppRoutes);