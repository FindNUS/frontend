import store from "../app/store";
import { getAuth } from "firebase/auth";

// Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
};

const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Phone number sign-in setup
const auth = getAuth();
auth.languageCode = "it";

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};
