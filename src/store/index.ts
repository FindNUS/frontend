import { configureStore } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";

const store = configureStore({
  reducer: {
    firebase: firebaseReducer, // Add firebase to reducers
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
