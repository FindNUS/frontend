import { combineReducers } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

// Reducers
import authReducer from "../features/auth/authSlice";
import loginReducer from "../features/auth/loginSlice";
import searchReducer from "../features/search/searchSlice";
import submitItemReducer from "../features/item_submission/submitItemSlice";
import viewItemReducer from "../features/view_item/viewItemSlice";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  login: loginReducer,
  search: searchReducer,
  submitItem: submitItemReducer,
  viewItem: viewItemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
