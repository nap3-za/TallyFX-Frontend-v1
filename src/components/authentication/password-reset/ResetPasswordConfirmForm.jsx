import React, { useState, Fragment, useRef } from 'react';
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
	Button,
	Checkbox,
	Label,
	TextInput,
} from "flowbite-react";

import Spinner from "../../misc/Spinner";

import { resetPasswordConfirm } from "../../../reduxApp/actions/authentication/actions";
import { getUrl } from "../../../AppUrls";

function ResetPasswordConfirmForm(props) {
	const { uid, token } = useParams();
	const [formData, setFormData] = useState({
		uid,
		token,
		new_password1: null,
		new_password2: null,
	});

	const form = useRef(null);
	const URL_SIGN_IN = getUrl("SIGN_IN");

	function handleFormSubmit(event) {
		event.preventDefault();
		props.resetPasswordConfirm(formData);
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
		          <Label htmlFor="new_password1" value="New Password" />
		        </div>
		        <TextInput name="new_password1" onChange={handleFormChange} id="new_password1" type="password" required />
		      </div>   
		      <div>
		        <div className="mb-2 block">
		          <Label htmlFor="new_password2" value="Confirm new password" />
		        </div>
		        <TextInput name="new_password2" onChange={handleFormChange} id="new_password2" type="password" required />
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

ResetPasswordConfirmForm.propTypes = {
	resetPasswordConfirm: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirmForm);

