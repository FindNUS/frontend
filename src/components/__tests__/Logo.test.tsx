import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import Logo from "../Logo";
import { act } from "react-dom/test-utils";

const renderEl = (className?: string) => {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Logo className={className} />
    </MemoryRouter>
  );
};
let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
  container = null;
});

describe("Logo component", () => {
  it("has the correct class", () => {
    act(() => {
      renderEl();
    });

    const renderedLogo = screen.getByAltText("FindNUS Logo");
    expect(renderedLogo).toHaveClass("logo");
  });

  it("should redirect home when clicked", () => {
    act(() => {
      const { getByAltText } = renderEl();

      // click on the logo
      getByAltText("FindNUS Logo").dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    const history = createMemoryHistory();
    // check if redirected to home page
    expect(history.location.pathname).toBe("/");
  });

  it("renders with class", () => {
    act(() => {
      renderEl("test class");
    });

    const logo = screen.getByTestId("logo-link");
    expect(logo).toHaveClass("test class");
  });
});
