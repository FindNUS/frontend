import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import Logo from "../Logo";

describe("Logo component", () => {
  it("has the correct class", () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Logo />
      </MemoryRouter>
    );

    const renderedLogo = getByAltText("FindNUS Logo");

    expect(renderedLogo).toHaveClass("logo");
  });

  it("should redirect home when clicked", () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Logo />
      </MemoryRouter>
    );
    const renderedLogo = getByAltText("FindNUS Logo");
    const history = createMemoryHistory();

    // click on the logo
    renderedLogo.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // check if redirected to home page
    expect(history.location.pathname).toBe("/");
  });
});
