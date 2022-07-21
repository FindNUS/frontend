import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Checkbox from "../Checkbox";

const testClass = "Lorem ipsum";
const testLabel = "This is a label";
const renderEl = (checked = false, handleChange = jest.fn()) => {
  return render(
    <Checkbox
      checked={checked}
      onChange={handleChange}
      className={testClass}
      label={testLabel}
    />
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

describe("Checkbox component", () => {
  it("renders with correct attributes", () => {
    act(() => {
      renderEl();
    });

    const wrapper = screen.getByTestId("checkbox");
    const checkbox = screen.getByRole("checkbox");
    const label = screen.queryByText(testLabel);
    expect(wrapper).toHaveClass(`checkbox ${testClass}`);
    expect(checkbox).toHaveClass("checkbox--input");
    expect(checkbox.id).toStrictEqual(label?.getAttribute("for"));
    expect(label).toHaveClass("checkbox--label");
    expect(label).toBeInTheDocument();
  });

  it("renders with default value", () => {
    act(() => {
      renderEl(true);
    });

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBeTruthy();
  });

  it("clickable", () => {
    act(() => {
      const { getByRole } = renderEl(true);
      fireEvent.click(getByRole("checkbox"));
    });

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBeFalsy();
  });

  it("handles onChange function", () => {
    const mockOnChange = jest.fn();
    act(() => {
      const { getByRole } = renderEl(false, mockOnChange);
      fireEvent.click(getByRole("checkbox"));
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
