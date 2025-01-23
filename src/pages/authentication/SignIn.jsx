import React, { Fragment } from 'react';
import SignInForm from "../../components/authentication/SignInForm";


function SignIn() {
	return (
        <Fragment>
            <section className="flex justify-center items-center py-24">
                <div className="w-max md:w-1/2 lg:w-2/5 xl:w-1/4">
            		<SignInForm />
                </div>
            </section>        	
        </Fragment>
	)
}


export default SignIn;
