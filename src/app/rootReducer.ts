import { combineReducers } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

// Reducers
import loginReducer from "../features/auth/loginSlice";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
