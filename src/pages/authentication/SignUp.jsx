import React, { Fragment } from 'react';
import SignUpForm from "../../components/authentication/SignUpForm";


function SignUp() {
	return (
        <Fragment>
            <section className="flex justify-center items-center py-24">
                <div className="w-max md:w-1/2 lg:w-7/12 xl:w-5/12">
            		<SignUpForm />
            	</div>
            </section>        	
        </Fragment>
	)
}


export default SignUp;
