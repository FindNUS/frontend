import React from "react";
import { render } from "@testing-library/react";
import ButtonLink from "../ButtonLink";
import { MemoryRouter } from "react-router-dom";

describe("Button component", () => {
  const testClass = "btn btn--primary";
  const sampleText = "Lorem ipsum";
  const testDest = "/login";

  it("has the correct class", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ButtonLink class={testClass} text={sampleText} to={testDest} />
      </MemoryRouter>
    );

    const btn = getByText(sampleText).parentElement;

    expect(btn).toHaveClass(testClass);
  });

  it("text renders properly", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ButtonLink class={testClass} text={sampleText} to={testDest} />
      </MemoryRouter>
    );

    const btn = getByText(sampleText).parentElement;

    expect(btn).toBeInTheDocument();
  });

  it("should redirect when clicked", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ButtonLink class={testClass} text={sampleText} to={testDest} />
      </MemoryRouter>
    );

    const link = getByText(sampleText) as HTMLAnchorElement;

    // check if link redirects to destination
    expect(link.getAttribute("href")).toBe(testDest);
  });
});
