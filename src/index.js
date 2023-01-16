import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDogaXTvfTHk1UmW78IiFAqycsVX9BY6yg",
  authDomain: "chat-fad97.firebaseapp.com",
  databaseURL: "https://chat-fad97-default-rtdb.firebaseio.com",
  projectId: "chat-fad97",
  storageBucket: "chat-fad97.appspot.com",
  messagingSenderId: "996204349251",
  appId: "1:996204349251:web:a4adb6d32c78a4826cd1f6",
  measurementId: "G-FEQ396E4Q9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
