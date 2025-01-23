import React, { useState, Fragment, useRef } from 'react';
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
	Button,
	Checkbox,
	Label,
	TextInput
} from "flowbite-react";

import Spinner from "../misc/Spinner";

import { signIn } from "../../reduxApp/actions/authentication/actions";
import { getUrl } from "../../AppUrls";


function SignInForm(props) {
	const usernameField = useRef(null);
	const [formData, setFormData] = useState({
		username: null,
		password: null
	});

	const form = useRef(null);
	const URL_SIGN_UP = getUrl("SIGN_UP");
	const URL_RESET_PASSWORD = getUrl("RESET_PASSWORD");

	function handleFormSubmit(event) {
		event.preventDefault();
		props.signIn(formData.username, formData.password);
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
		          <Label htmlFor="username" value="Your username" />
		        </div>
		        <TextInput name="username" onChange={handleFormChange} id="username" type="text" placeholder="username123" required />
		      </div>
		      <div>
		        <div className="mb-2 block">
		          <Label htmlFor="password1" value="Your password" />
		        </div>
		        <TextInput name="password" onChange={handleFormChange} id="password1" type="password" required />
		      </div>
		      <div className="flex items-center gap-2">
		        <Checkbox id="remember" />
		        <Label htmlFor="remember">Remember me</Label>
		      </div>

		      <Button type="submit">Submit</Button>

		      <div className="flex flex-col space-y-1 py-2 items-start">
		      	<p>
		      		Don't remember your password? <Link to={URL_RESET_PASSWORD} className="underline">Reset password</Link>
		      	</p>
		      	<p>
		      		Don't have an account? <Link to={URL_SIGN_UP} className="underline">Sign-up</Link>
		      	</p>
		     </div>

		     </Fragment>
	    	</form>
		}>

		</Spinner>

	)
}

SignInForm.propTypes = {
	signIn: PropTypes.func.isRequired
}


export default connect(null, { signIn })(SignInForm);

