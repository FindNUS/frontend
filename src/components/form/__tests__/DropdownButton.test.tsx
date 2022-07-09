import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DropdownButton from "../DropdownButton";
import { act } from "react-dom/test-utils";

const testName = "dropdown";
const testId = "dropdown";
const testOptions = [
  { key: "first", value: "option 1" },
  { key: "second", value: "option 2" },
  { key: "third", value: "option 3" },
];

const generateEl = ({
  handler = function () {
    return;
  },
  defaultValue = "first",
}) => (
  <form>
    <DropdownButton
      dropdownName={testName}
      dropdownID={testId}
      onChange={handler}
      selected={defaultValue}
      options={testOptions}
    />
  </form>
);

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
  container = null;
});

describe("Dropdown button component", () => {
  it("has the correct class", () => {
    render(generateEl({}));

    const container = screen.getByTestId("dropdown-container");

    expect(container).toHaveClass("dropdown-container");
  });

  it("renders attributes properly", () => {
    render(generateEl({}));

    const dropdown = screen.getByTestId("dropdown-select");

    expect(dropdown).toHaveAttribute("name", testName);
    expect(dropdown).toHaveAttribute("id", testId);
    expect(dropdown).toHaveClass("dropdown");
  });

  it("renders given list of elements", () => {
    render(generateEl({}));

    const options = screen.getAllByTestId("dropdown-option");

    options.forEach((option) => {
      const optionEl = option as HTMLOptionElement;
      const key = optionEl.value;
      const value = optionEl.textContent;
      const expectedValue = testOptions.filter((kv) => kv.key === key)[0].value;

      expect(value).toStrictEqual(expectedValue);
    });
  });

  it("selects and marks as edited", () => {
    act(() => {
      render(generateEl({}));
    });

    const dropdown = screen.getByTestId("dropdown-select") as HTMLSelectElement;
    expect(dropdown.getAttribute("data-edited")).toStrictEqual("false");

    act(() => {
      fireEvent.change(dropdown, { target: { value: "second" } });
    });

    expect(dropdown.getAttribute("data-edited")).toStrictEqual("true");
    expect(dropdown).toHaveTextContent("option 2");
  });

  it("handles onClick function", () => {
    const mockOnClick = jest.fn();
    render(generateEl({ handler: mockOnClick }));

    const dropdown = screen.getByTestId("dropdown-select") as HTMLSelectElement;
    fireEvent.change(dropdown, { target: { value: "second" } });

    expect(mockOnClick).toBeCalledTimes(1);
  });

  it("renders with default value", () => {
    act(() => {
      render(generateEl({ defaultValue: "third" }));
    });

    const dropdown = screen.getByTestId("dropdown-select") as HTMLSelectElement;
    expect(dropdown).toHaveTextContent("option 3");
  });
});
