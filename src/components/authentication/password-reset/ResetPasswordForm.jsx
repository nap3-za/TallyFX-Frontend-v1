import React, { useState, Fragment, useRef } from 'react';
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
	Button,
	Checkbox,
	Label,
	TextInput,
} from "flowbite-react";

import Spinner from "../../misc/Spinner";

import { resetPassword } from "../../../reduxApp/actions/authentication/actions";
import { getUrl } from "../../../AppUrls";


function ResetPasswordForm(props) {
	const [formData, setFormData] = useState({
		email: null,
	});

	const form = useRef(null);
	const URL_SIGN_IN = getUrl("SIGN_IN");

	function handleFormSubmit(event) {
		event.preventDefault();
		const success = props.resetPassword(formData);
		console.log(success);
		if (success === true) {
			return <Navigate to={getUrl("RESET_PASSWORD_DONE")} />;
		}
		clearForm();
	}

	function handleFormChange(event) {
		const { name, value } = event.target
		event.preventDefault();
		setFormData((prevState) => {
			return {
				...formData,
				[name]: value,
			};
		});
	};

	function clearForm() {
		form.current && form.current.reset();
	}



	return (

		<Spinner component={

		    <form className="flex w-full flex-col gap-4" ref={form} onSubmit={handleFormSubmit}>
			  	<Fragment>
			      <div>
			        <div className="mb-2 block">
			          <Label htmlFor="email" value="Your email" />
			        </div>
			        <TextInput name="email" onChange={handleFormChange} id="email" type="email" placeholder="john@doe.com" required />
			      </div>
			      
			      <div className="flex items-start gap-2">
			      	Remeber your password? <Link to={URL_SIGN_IN} className="underline">Sign-in</Link>
			      </div>
			      <Button type="submit">Submit</Button>
			     </Fragment>
		    </form>
		}>
		</Spinner>
	)
}

ResetPasswordForm.propTypes = {
	resetPassword: PropTypes.func.isRequired
}

export default connect(null, { resetPassword })(ResetPasswordForm);

