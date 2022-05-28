import { combineReducers } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

// Reducers
import loginReducer from "../features/auth/loginSlice";
import searchReducer from "../features/search/searchSlice";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  login: loginReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
