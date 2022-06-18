import { combineReducers } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

// Reducers
import authReducer from "../features/auth/authSlice";
import loginReducer from "../features/auth/loginSlice";
import searchReducer from "../features/search/searchSlice";
import submitItemReducer from "../features/item_submission/submitItemSlice";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  login: loginReducer,
  search: searchReducer,
  submitItem: submitItemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
