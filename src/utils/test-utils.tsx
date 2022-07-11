import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import { rrfProps } from "../app/firebase";
import rootReducer, { RootState } from "../app/rootReducer";
import { AppStore } from "../app/store";
import userEvent from "@testing-library/user-event";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 * Render a React Element with a React Redux Provider. Can be used like
 * the `render()` method from React Testing Library (RTL).
 * See {@link https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function redux.js.org}.
 *
 * @param ui The React element to be rendered.
 * @param Object (optional) The object containing desired initial state,
 * and store object.
 * @returns Same methods returned by RTL's render method.
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {children}
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = "/" } = {}
) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
