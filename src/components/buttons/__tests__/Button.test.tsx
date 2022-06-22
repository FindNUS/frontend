import React from "react";
import { render } from "@testing-library/react";
import Button from "../Button";

describe("Button component", () => {
  const testClass = "btn btn--primary";
  const sampleText = "Lorem ipsum";

  it("has the correct class", () => {
    const { getByText } = render(
      <Button class={testClass} text={sampleText} />
    );

    const btn = getByText(sampleText);

    expect(btn).toHaveClass(testClass);
  });

  it("text renders properly", () => {
    const { getByText } = render(
      <Button class={testClass} text={sampleText} />
    );

    const btn = getByText(sampleText);

    expect(btn).toBeInTheDocument();
  });
});
