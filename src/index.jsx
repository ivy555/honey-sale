// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

//test import for index.jsx

// import 'styles/style.scss';
// import 'normalize.css/normalize.css';
// import { onAuthStateFail, onAuthStateSuccess } from './redux/actions/authActions';
// import 'react-phone-input-2/lib/style.css';
// import { Preloader } from './components/common';
// import React from 'react';
// import { render } from 'react-dom';
// import configureStore from './redux/store/store';
// import WebFont from 'webfontloader';
// import App from './App';
// import firebase from './services/firebase';


import "../src/styles/style.scss";
import { onAuthStateFail, onAuthStateSuccess } from "./redux/actions/authActions";
import 'react-phone-input-2/lib/style.css';
import Preloader from "./components/common/Preloader";
import React from 'react';
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import WebFont from "webfontloader";
import App from "./App";
import firebase from "./services/firebase";




WebFont.load({
  google: {
    families: ['Tajawal']
  }
});

const { store, persistor } = configureStore();
const root = document.getElementById('app');

// Render the preloader on initial load
render(<Preloader />, root);

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail('Failed to authenticate'));
  }
  // then render the app after checking the auth state
  render(<App store={store} persistor={persistor} />, root);
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
