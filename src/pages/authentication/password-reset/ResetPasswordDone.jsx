import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUrl } from "../../../AppUrls";


function ResetPasswordDone(props) {
  	const URL_SIGN_IN = getUrl("SIGN_IN");


	return (

		<section className="bg-white dark:bg-gray-900">
		    <div className="py-24 px-4 mx-auto max-w-screen-xl lg:px-6">
		        <div className="mx-auto max-w-screen-sm text-center">
		            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
		            	Password Reset Email Sent
		            </p>
		            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
		            	An email was sent to your email address , check your inbox for the email and follow the instructions. If you can't find the email please check your spam folder
		            </p>
		            <Link to={URL_SIGN_IN} className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
		            	Sign-in
		            </Link>
		        </div>   
		    </div>
		</section>

	)
}


export default ResetPasswordDone;
	

