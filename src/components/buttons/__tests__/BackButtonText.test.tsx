import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BackButtonText from "../BackButtonText";

const baseClass = "back-btn-text";
const additionalClass = "some-class another-class";
const btnText = "This is a back button";

describe("Back button with text component", () => {
  it("has the correct class", () => {
    render(<BackButtonText message={btnText} onClick={jest.fn()} />);

    const mainDivEl = screen.getByText(btnText).parentElement;

    expect(mainDivEl).toHaveClass(baseClass);
  });

  it("renders additional classes", () => {
    render(
      <BackButtonText
        className={additionalClass}
        message={btnText}
        onClick={jest.fn()}
      />
    );

    const mainDivEl = screen.getByText(btnText).parentElement;

    expect(mainDivEl).toHaveClass(`${baseClass} ${additionalClass}`);
  });

  it("renders back icon", () => {
    render(<BackButtonText message={btnText} onClick={jest.fn()} />);

    const iconEl = screen.getByTestId("ChevronLeftIcon");

    expect(iconEl).toBeInTheDocument();
  });

  it("handles onClick function", async () => {
    const mockOnClick = jest.fn();

    render(<BackButtonText message={btnText} onClick={mockOnClick} />);

    const mainDivEl = screen.getByText(btnText).parentElement as HTMLDivElement;
    fireEvent.click(mainDivEl);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
