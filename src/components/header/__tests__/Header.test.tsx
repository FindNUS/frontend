import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createAppStore, StoreType } from "../../../app/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps } from "../../../app/firebase";
import Header from "../Header";

const generateEl = (
  isHomePage: boolean,
  isSubmitPage: boolean,
  isLoggedIn = false
) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <MemoryRouter initialEntries={["/"]}>
          <Header
            isHomePage={isHomePage}
            isSubmitPage={isSubmitPage}
            isLoggedIn={isLoggedIn}
          />
        </MemoryRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

let store: StoreType;
describe("Header component", () => {
  beforeEach(() => {
    store = createAppStore();
  });

  it("has the correct classes", () => {
    render(generateEl(false, false));

    const headerEl = screen.getByTestId("header");
    const navEl = screen.getByRole("navigation");
    const navButtonListEl = screen.getByRole("list");

    expect(headerEl).toHaveClass("header");
    expect(navEl).toHaveClass("nav");
    expect(navButtonListEl).toHaveClass("nav__list");
  });

  it("renders logo", () => {
    render(generateEl(false, false));

    const logo = screen.getByRole("img");

    expect(logo).toBeInTheDocument();
  });

  it("does not render home if on home page", () => {
    render(generateEl(true, false));

    const navButtons = screen.getAllByRole("listitem");
    const homeBtn = navButtons.find((btn) => btn.textContent === "Home");

    expect(homeBtn).toBeUndefined();
  });

  it("does not render submit page if on submit page", () => {
    render(generateEl(false, true));

    const navButtons = screen.getAllByRole("listitem");
    const submitBtn = navButtons.find(
      (btn) => btn.textContent === "Submit an item"
    );

    expect(submitBtn).toBeUndefined();
  });

  it("renders both home and submit item buttons", () => {
    render(generateEl(false, false));

    const navButtons = screen.getAllByRole("listitem");
    const homeBtn = navButtons.find((btn) => btn.textContent === "Home");
    const submitBtn = navButtons.find(
      (btn) => btn.textContent === "Submit an item"
    );

    expect(homeBtn).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it("renders the login button", () => {
    render(generateEl(false, false));

    const navButtons = screen.getAllByRole("listitem");
    const loginBtn = navButtons.find((btn) => btn.textContent === "Login");
    const logoutBtn = navButtons.find((btn) => btn.textContent === "Logout");

    expect(loginBtn).toBeInTheDocument();
    expect(logoutBtn).toBeUndefined();
  });

  it("renders the logout button", () => {
    render(generateEl(false, false, true));

    const navButtons = screen.getAllByRole("listitem");
    const loginBtn = navButtons.find((btn) => btn.textContent === "Login");
    const logoutBtn = navButtons.find((btn) => btn.textContent === "Logout");

    expect(logoutBtn).toBeInTheDocument();
    expect(loginBtn).toBeUndefined();
  });
});
