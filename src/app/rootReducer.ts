import { combineReducers } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";

// Reducers
import loginReducer from "./slices/login-slice";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
