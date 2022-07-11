import React from "react";
import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PreviewFilter from "../PreviewFilter";
import { renderWithRouter } from "../../../utils/test-utils";
import {
  DROPDOWN_DEFAULT_KEY,
  SUBMIT_FOUND_CATEGORIES,
} from "../../../constants";

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
  container = null;
});

describe("Preview filter component", () => {
  it("renders with correct classes", () => {
    act(() => {
      renderWithRouter(<PreviewFilter />);
    });

    const menus = screen.getAllByTestId("dropdown-select");

    act(() => {
      // assuming category filter is first
      fireEvent.change(menus[0], {
        target: { value: SUBMIT_FOUND_CATEGORIES[1].value },
      });
    });

    const resetButton = screen.queryByText(/reset/i);
    expect(resetButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(resetButton as HTMLElement);
    });

    expect(resetButton).not.toBeInTheDocument();
    expect(menus[0]).toHaveValue(DROPDOWN_DEFAULT_KEY);
  });
});
