import React from "react";
import { render } from "@testing-library/react";
import ButtonSearch from "../ButtonSearch";

const dummyOnSearch = (ev: React.FormEvent) => {
  ev.preventDefault();
  return;
};

describe("Button searchs component", () => {
  const testClass = "btn btn--primary";

  it("renders properly", () => {
    const { getByText } = render(<ButtonSearch onSearch={dummyOnSearch} />);

    const btn = getByText("Search").parentElement;

    expect(btn).toBeInTheDocument();
  });

  it("has the correct class", () => {
    const { getByText } = render(
      <ButtonSearch className={testClass} onSearch={dummyOnSearch} />
    );

    const btn = getByText("Search").parentElement;

    expect(btn).toHaveClass(testClass);
  });
});
