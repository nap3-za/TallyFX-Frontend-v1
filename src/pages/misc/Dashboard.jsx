import React, { Fragment } from "react";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { getEvents } from "../../reduxApp/actions/app/actions";

function Dashboard(props) {
    const {user} = props;

    function handleClick(event) {
        event.preventDefault();
        props.getEvents({
            filter: 0,
            
        })
    }
    
    return (
        <Fragment>
           <button onClick={handleClick} className="button btn-primary">Get Events</button>
        </Fragment>
    )
}

Dashboard.propTypes = {
    user: PropTypes.object,
    getEvents: PropTypes.func,
}

const mapStateToProps = state => ({
    user: state.account.user,
})

export default connect(mapStateToProps, { getEvents })(Dashboard);



