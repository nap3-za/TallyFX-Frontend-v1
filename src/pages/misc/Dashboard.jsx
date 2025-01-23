import React, { Fragment } from "react";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

function Dashboard(props) {
    const {user} = props;

    
    return (
        <Fragment>
            Hello World Dashboard!!!
        </Fragment>
    )
}

Dashboard.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = state => ({
    user: state.account.user,
})

export default connect(mapStateToProps)(Dashboard);



