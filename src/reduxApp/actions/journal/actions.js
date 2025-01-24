import axios from "axios";

import {
	LOADING_OFF,
} from "../app/types";

import {
	EP_DEFAULT_JOURNAL,
	EP_JOURNAL_VIEWSET,
} from "../../../AppEndpoints";

import { tokenConfigurator } from "../../../Utilities";

import { raiseErrors, createMessage } from "../messages/actions";


export const getDefaultJournal = (populateDefaultJournal) => (dispatch, getState) => {
	axios.get(EP_DEFAULT_JOURNAL, tokenConfigurator(getState))
		.then(response => {
			dispatch({type: LOADING_OFF});
			if (response.status === 204) {
				populateDefaultJournal("NO_CONTENT");
			} else {
				populateDefaultJournal({
					...response.data,
					loading: false,
				});
			}

		}).catch(error => {
			dispatch({type: LOADING_OFF});
			dispatch(raiseErrors(error.response.data, error.response.status));
			populateDefaultJournal(null);
		})	
}

export const getJournals = (populateJournals) => (dispatch, getState) => {
	axios.get(EP_JOURNAL_VIEWSET, tokenConfigurator(getState))
		.then(response => {
			dispatch({type: LOADING_OFF});
			populateJournals({
				...response.data,
				loading: false,
			});

		}).catch(error => {
			dispatch({type: LOADING_OFF});
			dispatch(raiseErrors(error.response.data, error.response.status));
			populateJournals(null);
		})	
}

export const createJournal = (createJournalData) => (dispatch, getState) => {
	axios.post(EP_JOURNAL_VIEWSET, createJournalData, tokenConfigurator(getState))
		.then(response => {
			dispatch({type: LOADING_OFF});
			dispatch(createMessage("Journal created"));
		}).catch(error => {
			dispatch({type: LOADING_OFF});
			dispatch(raiseErrors(error.response.data, error.response.status));
		})	
}



