import React, { Fragment, useEffect, } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";
import { usePrevious } from "../../Utilities";

function Alerts(props) {

	const { error, alert, message } = props
	const prevError = usePrevious(error)
	const prevMessage = usePrevious(message)

	useEffect(
		() => {
			if (error.error && error !== prevError) {
				for (const [key, value] of Object.entries(error.error)) {
					alert.error(`${value}`)
				}
			}

			if (message !== prevMessage) {
				if (message.message) {
					if (message.type === "INFO") {
						alert.info(message.message);
					} else {
						alert.success(message.message);
					}
				}
			}
		}
	)
	return <Fragment />
}

Alerts.propTypes = {
	error: PropTypes.object.isRequired,
	message: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	error: state.messages.error,
	message: state.messages.message,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
