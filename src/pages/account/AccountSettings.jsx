import React, { Fragment, useState, useRef, Suspense } from "react";
import PropTypes from  "prop-types"
import { connect } from "react-redux";

import { Select } from "flowbite-react";

import Spinner from "../../components/misc/Spinner";

import { updateAccount } from "../../reduxApp/actions/account/actions";
import { changePassword } from "../../reduxApp/actions/authentication/actions";
import { getUrl } from "../../AppUrls";

import { BRAND_NAME_NORMAL, BRAND_NAME_LOWER } from "../../Constants";
import { GENDERS } from "../../FieldChoices"


function AccountSettings(props) {
	const { user } = props;


	const [updateFormData, setUpdateFormData] = useState({
		email: user.email,
		name: user.name,
		surname: user.surname,
		username: user.username,
		gender: user.gender,
		phone_number: user.phone_number || "",
	});
	const updateForm = useRef(null);
	
	function handleUpdateFormSubmit(event) {
		event.preventDefault();
		props.updateAccount(updateFormData, user.id);
	}

	function handleUpdateFormChange(event) {
		const { name, value } = event.target
		event.preventDefault();
		setUpdateFormData((prevState) => {
			return {
				...updateFormData,
				[name]: value,
			};
		});
	};

	// - - - -

	const [passwordChangeFormData, setPasswordChangeFormData] = useState({
		old_password: null,
		new_password1: null,
		new_password2: null,
	});
	const passwordChangeForm = useRef(null);
	
	function handlePasswordChangeFormSubmit(event) {
		event.preventDefault();
		props.changePassword(passwordChangeFormData);
		clearPasswordChangeForm();
	}

	function handlePasswordChangeFormChange(event) {
		const { name, value } = event.target
		event.preventDefault();
		setPasswordChangeFormData((prevState) => {
			return {
				...passwordChangeFormData,
				[name]: value,
			};
		});
	};

	function clearPasswordChangeForm() {
		passwordChangeForm.current && passwordChangeForm.current.reset();
	}

	// - - - -

	const [profileImage, setProfileImage] = useState({
		profile_image: "",
	});
	const profileImageForm = useRef(null);

	function handleProfileImageFormChange(event) {
		event.preventDefault();
		props.updateAccount({
			profile_image: event.target.files[0],
		}, user.id);
		clearProfileImageForm();	
	};

	function clearProfileImageForm() {
		profileImageForm.current && profileImageForm.current.reset();
	}

	// - - -

	function handleNotificationsChange() {
		
	}


    return (
    	<div className="space-y-4">
            <div className="grid grid-cols-1 pt-2 xl:grid-cols-5 xl:gap-4 dark:bg-gray-900">
                
                <div className="mb-4 col-span-full xl:mb-2">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        Account
                    </h1>
                </div>
                

                <div className="col-span-full xl:col-span-2">
			        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
			            <h3 className="mb-4 text-xl font-semibold dark:text-white">Language & Time</h3>
			            <div className="mb-4">
			                <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select language</label>
			                <select id="settings-language" name="countries" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
			                    <option>English (US)</option>
			                    <option>Italiano</option>
			                    <option>Français (France)</option>
			                    <option>正體字</option>
			                    <option>Español (España)</option>
			                    <option>Deutsch</option>
			                    <option>Português (Brasil)</option>
			                </select>
			            </div>
			            <div className="mb-6">
			                <label htmlFor="settings-timezone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Zone</label>
			                <select id="settings-timezone" name="countries" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
			                    <option>GMT+0 Greenwich Mean Time (GMT)</option>
			                    <option>GMT+1 Central European Time (CET)</option>
			                    <option>GMT+2 Eastern European Time (EET)</option>
			                    <option>GMT+3 Moscow Time (MSK)</option>
			                    <option>GMT+5 Pakistan Standard Time (PKT)</option>
			                    <option>GMT+8 China Standard Time (CST)</option>
			                    <option>GMT+10 Eastern Australia Standard Time (AEST)</option>
			                </select>
			            </div>
			            <div>
			                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
			            </div>
			        </div>
                </div>

                <div className="col-span-3">
			        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
			            <h3 className="mb-4 text-xl font-semibold dark:text-white">Password Change</h3>
			            <form ref={passwordChangeForm} onSubmit={handlePasswordChangeFormSubmit} action="#">
			                
			                <div className="grid grid-cols-6 gap-6">
			                    <div className="col-span-6 sm:col-span-3">
			                        <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
			                        <input name="old_password" onChange={handlePasswordChangeFormChange} type="password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
			                    </div>
			                    <div className="col-span-6 sm:col-span-3">
			                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
			                        <input name="new_password1" onChange={handlePasswordChangeFormChange} data-popover-target="popover-password" data-popover-placement="bottom" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
			                        <div data-popover id="popover-password" role="tooltip" className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
			                            <div className="p-3 space-y-2">
			                                <h3 className="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>
			                                <div className="grid grid-cols-4 gap-2">
			                                    <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
			                                    <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
			                                    <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
			                                    <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
			                                </div>
			                                <p>It’s better to have:</p>
			                                <ul>
			                                    <li className="flex items-center mb-1">
			                                        <svg className="w-4 h-4 mr-2 text-green-400 dark:text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
			                                        Upper & lower case letters
			                                    </li>
			                                    <li className="flex items-center mb-1">
			                                        <svg className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
			                                        A symbol (#$&)
			                                    </li>
			                                    <li className="flex items-center">
			                                        <svg className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
			                                        A longer password (min. 12 chars.)
			                                    </li>
			                                </ul>
			                        </div>
			                        <div data-popper-arrow></div>
			                        </div>
			                    </div>
			                    <div className="col-span-6 sm:col-span-3">
			                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
			                        <input name="new_password2" onChange={handlePasswordChangeFormChange} type="password" id="confirm-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
			                    </div>
			                    <div className="col-span-6 sm:col-full">
			                        <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Save all</button>
			                    </div>
			                </div>
			            </form>
			        </div>	           
                </div> 
            </div>

			<div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">

                <div className="mb-4 col-span-full xl:mb-2">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        Notifications
                    </h1>
                </div>

			    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
			        <div className="flow-root">
			            <h3 className="text-xl font-semibold dark:text-white">Alerts & Notifications</h3>
			            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">You can set up { BRAND_NAME_NORMAL } to get notifications</p>
			            <div className="divide-y divide-gray-200 dark:divide-gray-700">
			                
			                <div className="flex items-center justify-between py-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">Company News</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get { BRAND_NAME_NORMAL } news, announcements, and product updates</div>
			                    </div>
			                    <label htmlFor="company-news" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="company-news" className="sr-only" />
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			                
			                <div className="flex items-center justify-between py-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">Account Activity</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get important notifications about you or activity you've missed</div>
			                    </div>
			                    <label htmlFor="account-activity" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="account-activity" className="sr-only" checked onChange={handleNotificationsChange} />
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			                
			                <div className="flex items-center justify-between py-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">Meetups Near You</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get an email when a Dribbble Meetup is posted close to my location</div>
			                    </div>
			                    <label htmlFor="meetups" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="meetups" className="sr-only" checked onChange={handleNotificationsChange} />
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			                
			                <div className="flex items-center justify-between pt-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">New Messages</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get Themsberg news, announcements, and product updates</div>
			                    </div>
			                    <label htmlFor="new-messages" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="new-messages" className="sr-only" />
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			            </div>
			            <div className="mt-6">
			                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
			            </div>
			        </div>
			    </div>

			    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
			        <div className="flow-root">
			            <h3 className="text-xl font-semibold dark:text-white">Email Notifications</h3>
			            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">You can set up { BRAND_NAME_NORMAL } to get email notifications </p>
			            <div className="divide-y divide-gray-200 dark:divide-gray-700">
			                
			                <div className="flex items-center justify-between py-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">Rating reminders</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send an email reminding me to rate an item a week after purchase</div>
			                    </div>
			                    <label htmlFor="rating-reminders" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="rating-reminders" className="sr-only" />
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			                
			                <div className="flex items-center justify-between py-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">Item update notifications</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send user and product notifications for you</div>
			                    </div>
			                    <label htmlFor="item-update" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="item-update" className="sr-only" checked onChange={handleNotificationsChange} />
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			                
			                <div className="flex items-center justify-between py-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">Item comment notifications</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send me an email when someone comments on one of my items</div>
			                    </div>
			                    <label htmlFor="item-comment" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="item-comment" className="sr-only" checked onChange={handleNotificationsChange} />
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			                
			                <div className="flex items-center justify-between pt-4">
			                    <div className="flex flex-col flex-grow">
			                        <div className="text-lg font-semibold text-gray-900 dark:text-white">Buyer review notifications</div>
			                        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send me an email when someone leaves a review with their rating</div>
			                    </div>
			                    <label htmlFor="buyer-rev" className="relative flex items-center cursor-pointer">
			                        <input type="checkbox" id="buyer-rev" className="sr-only"/>
			                        <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
			                    </label>
			                </div>
			            </div>
			            <div className="mt-6">
			                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
			            </div>
			        </div>
			    </div>
			</div>
    	</div>
    )
}

AccountSettings.propTypes = {
    updateAccount: PropTypes.func,
    changePassword: PropTypes.func,
}

const mapStateToProps = state => ({
    user: state.account.user,
})

export default connect(mapStateToProps, { updateAccount, changePassword })(AccountSettings);



