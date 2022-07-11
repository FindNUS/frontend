import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import { constants as rfConstants } from "redux-firestore";

export const createAppStore = (
  preloadedState?: PreloadedState<ReducerRootState>
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            // just ignore every redux-firebase and react-redux-firebase action type
            ...Object.keys(rfConstants.actionTypes).map(
              (type) => `${rfConstants.actionsPrefix}/${type}`
            ),
            ...Object.keys(rrfActionTypes).map(
              (type) => `@@reactReduxFirebase/${type}`
            ),
          ],
          ignoredPaths: ["firebase", "firestore"],
        },
        thunk: {
          extraArgument: {
            getFirebase,
          },
        },
      }),
    preloadedState,
  });

const store = createAppStore();

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type ReducerRootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof createAppStore>;
