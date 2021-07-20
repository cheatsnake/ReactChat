import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(
  {
    apiKey: "AIzaSyDbBcYmG3q_i55sS4AnWNuf-dI-96Simik",
    authDomain: "react-chat-app-77eaa.firebaseapp.com",
    projectId: "react-chat-app-77eaa",
    storageBucket: "react-chat-app-77eaa.appspot.com",
    messagingSenderId: "824658429585",
    appId: "1:824658429585:web:21e9951bec19474ccba130",
    measurementId: "G-81Z26XEMX7"
  }
);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider value = {{
    firebase,
    auth,
    firestore
  }}
  >
        <App />
  </Context.Provider>,

  document.getElementById('root')
);
