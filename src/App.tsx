
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser, logout } from "./reduxApp/actions/authentication/actions";

import AppRoutes from "./AppRoutes";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Alerts from "./components/misc/Alerts";


import Spinner from "./components/misc/Spinner";


function App(props) {
  const { isAuthenticated } = props;
  

  return (
    <Router>
      
        <div className="antialiased bg-white dark:bg-gray-900">
          <Navbar />
          <Alerts />
          
          <Spinner component={
            <>
            { isAuthenticated ?
              <>
                <Sidebar />
                <main className="p-4 md:ml-64 h-auto pt-20 bg-gray-50">
                  <AppRoutes />
                </main>
              </>
            :

              <main className="p-4 h-auto">
                <AppRoutes />
              </main>
            }
            </>
          } userLoading={true} >

          </Spinner>
          <Footer />
        </div>
    </Router>
  );
}

App.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
})
export default connect(mapStateToProps, { logout })(App);