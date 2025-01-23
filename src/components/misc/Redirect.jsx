import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { resetRedirect } from "../../reduxApp/actions/app/actions";
import { usePrevious } from "../../Utilities";


function Redirect(props) {
	const { redirect, component } = props;
	const prevRedirect = usePrevious(props.redirect);

	function redirectDone() {
		props.resetRedirect();
	}

    return (
        <>
        	{ redirect !== null || prevRedirect ?
        		<>
        			{redirectDone()}
        			<Navigate to={prevRedirect} />	
        		</>
        	:
        		component
        	}
        </>
    )
}

Redirect.propTypes = {
    redirect: PropTypes.string,
    resetRedirect: PropTypes.func,
}

const mapStateToProps = state => ({
    redirect: state.app.redirect,
})

export default connect(mapStateToProps, { resetRedirect })(Redirect);
