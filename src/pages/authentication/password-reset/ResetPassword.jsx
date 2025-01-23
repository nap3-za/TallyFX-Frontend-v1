import React, { Fragment } from 'react';
import ResetPasswordForm from "../../../components/authentication/password-reset/ResetPasswordForm";


function ResetPassword() {
	return (
        <Fragment>
            <section className="flex justify-center items-center py-24">
                <div className="w-max md:w-1/2 lg:w-2/5 xl:w-1/4">
            		<ResetPasswordForm />
            	</div>
            </section>        	
        </Fragment>
	)
}


export default ResetPassword;
