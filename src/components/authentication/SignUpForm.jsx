import React, { useState, Fragment, useRef } from 'react';
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";

import { signUp } from "../../reduxApp/actions/authentication/actions";
import { getUrl } from "../../AppUrls";

import Spinner from "../misc/Spinner";


function SignUpForm(props) {
	const [formData, setFormData] = useState({
		email: null,
		name: null,
		surname: null,
		username: null,
		gender: null,
		phone_number: null,
		password: null,
		password2: null,
		accept: null,
	});
	const form = useRef(null);
  	const URL_SIGN_IN = getUrl("SIGN_IN");
  	const URL_RESET_PASSWORD = getUrl("RESET_PASSWORD");

	function handleFormSubmit(event) {
		event.preventDefault();
		props.signUp(formData); 
		
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
		  <div className="flex flex-row space-x-2">
			  <div className="w-full">
				<div className="mb-2 block">
				  <Label htmlFor="name" value="Your name" />
				</div>
				<TextInput name="name" onChange={handleFormChange} id="name" type="text" placeholder="john" required />
			  </div>

			  <div className="w-full">
				<div className="mb-2 block">
				  <Label htmlFor="surname" value="Your surname" />
				</div>
				<TextInput name="surname" onChange={handleFormChange} id="surname" type="text" placeholder="doe" required />
			  </div>
		  </div>

		    <div className="w-full">
		      <div className="mb-2 block">
		        <Label htmlFor="gender" value="Select your gender" />
		      </div>
		      <Select name="gender" onChange={handleFormChange} id="gender" required>
		      	<option>- - - - -</option>
		        <option value="MLE">Male</option>
		        <option value="FML">Female</option>
		        <option value="NBN">Non-binary</option>
		      </Select>
		    </div>

		  <div className="flex flex-row space-x-2">
			  <div className="w-full">
				<div className="mb-2 block">
				  <Label htmlFor="email" value="Your email" />
				</div>
				<TextInput name="email" onChange={handleFormChange} id="email" type="text" placeholder="john" required />
			  </div>

			  <div className="w-full">
				<div className="mb-2 block">
				  <Label htmlFor="phone_number" value="Your phone number" />
				</div>
				<TextInput name="phone_number" onChange={handleFormChange} id="phone_number" type="text" placeholder="+27123456789" />
			  </div>
		  </div>

		  <div>
			<div className="mb-2 block">
			  <Label htmlFor="username" value="Your username" />
			</div>
			<TextInput name="username" onChange={handleFormChange} id="username" type="text" placeholder="username123" required />
		  </div>

			<div className="flex flex-row space-x-2">
			  <div className="w-full">
				<div className="mb-2 block">
				  <Label htmlFor="password1" value="Your password" />
				</div>
				<TextInput name="password" onChange={handleFormChange} id="password1" type="password" required />
			  </div>

			  <div className="w-full">
				<div className="mb-2 block">
				  <Label htmlFor="password2" value="Confirm password" />
				</div>
				<TextInput name="password2" onChange={handleFormChange} id="password2" type="password" required />
			  </div>
			</div>

		      <div className="flex items-center gap-2">
		        <Checkbox name="accept" onChange={handleFormChange} id="accept" required/>
		        <Label htmlFor="accept" className="flex">
		          I agree with the&nbsp;
		          <Link to="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
		            terms and conditions
		          </Link>
		        </Label>
		      </div>

		  <Button type="submit">Submit</Button>

	      <div className="flex flex-col space-y-1 py-2 items-start">
	      	<p>
	      		Don't remember your password? <Link to={URL_RESET_PASSWORD} className="underline">Reset password</Link>
	      	</p>
	      	<p>
	      		Already have an account? <Link to={URL_SIGN_IN} className="underline">Sign-in</Link>
	      	</p>
	     </div>

		</form>
	}>

	</Spinner>
	)
}

SignUpForm.propTypes = {
	signUp: PropTypes.func.isRequired,
}


export default connect(null, { signUp })(SignUpForm);

