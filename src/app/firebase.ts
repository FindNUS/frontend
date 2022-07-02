import store from "./store";
import { initializeAuth, inMemoryPersistence } from "firebase/auth";

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
const app = firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore();

const auth = initializeAuth(app, {
  persistence: inMemoryPersistence,
  popupRedirectResolver: undefined,
});

// Phone number sign-in setup
auth.languageCode = "en";

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export { auth as firebaseAuth };
