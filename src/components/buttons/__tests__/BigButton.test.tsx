import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BigButton from "../BigButton";

const primaryClass = "btn btn-big btn--primary";
const secondaryClass = "btn btn-big btn--secondary";
const sampleText = "Lorem ipsum";

describe("Button component", () => {
  it("has the correct class", () => {
    render(
      <BigButton text={sampleText} colour="primary" onClick={jest.fn()} />
    );

    const btn = screen.getByRole("button");

    expect(btn).toHaveClass(primaryClass);
  });

  it("renders different colours", () => {
    render(
      <BigButton text={sampleText} colour="secondary" onClick={jest.fn()} />
    );

    const btn = screen.getByRole("button");

    expect(btn).toHaveClass(secondaryClass);
  });

  it("text renders properly", () => {
    render(
      <BigButton text={sampleText} colour="primary" onClick={jest.fn()} />
    );

    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(sampleText);
  });

  it("handles onClick function", async () => {
    const mockOnClick = jest.fn();
    render(
      <BigButton text={sampleText} colour="primary" onClick={mockOnClick} />
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
