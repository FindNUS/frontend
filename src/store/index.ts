import { configureStore } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";

const store = configureStore({
  reducer: {
    firebase: firebaseReducer, // Add firebase to reducers
  },
});

export default store;
