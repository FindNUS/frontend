import store from "./store";
import {
  connectAuthEmulator,
  initializeAuth,
  inMemoryPersistence,
} from "firebase/auth";

// Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  DEPLOY_ENV,
  fbConfig,
  FIREBASE_AUTH_EMULATOR_PORT,
  FIREBASE_FIREBASE_EMULATOR_PORT,
  NODE_ENV,
} from "../constants";

// Firestore
import { createFirestoreInstance } from "redux-firestore";
import "firebase/compat/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

// Initialize firebase instance
const app = firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
const db = firebase.firestore();

const auth = initializeAuth(app, {
  persistence: inMemoryPersistence,
  popupRedirectResolver: undefined,
});

if (DEPLOY_ENV === "test" || NODE_ENV === "test") {
  connectAuthEmulator(auth, `http://localhost:${FIREBASE_AUTH_EMULATOR_PORT}`, {
    disableWarnings: true,
  });
  connectFirestoreEmulator(
    db,
    "localhost",
    +`${FIREBASE_FIREBASE_EMULATOR_PORT}`
  );
  auth.settings.appVerificationDisabledForTesting = true;
}

// Phone number sign-in setup
auth.languageCode = "en";

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export { auth as firebaseAuth };
