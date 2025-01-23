import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from "react-redux";
import  { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import store from "./reduxApp/store";
import { loadUser } from "./reduxApp/actions/authentication/actions";



// Alert config
const alertConfig = {
    positon: positions.TOP_CENTER,
    transition: transitions.SCALE,
    timeout: 7500,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  {store.dispatch(loadUser())}
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertConfig}>
            <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);




