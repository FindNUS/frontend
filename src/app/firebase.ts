import store from "./store";
import { getAuth } from "firebase/auth";

// Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { fbConfig } from "../constants";

// Firestore
import { createFirestoreInstance } from "redux-firestore";
import "firebase/compat/firestore";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore();

// Phone number sign-in setup
const auth = getAuth();
auth.languageCode = "en";

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
