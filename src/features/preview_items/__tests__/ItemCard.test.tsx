import React from "react";
import { render, screen } from "@testing-library/react";
import ItemCard from "../ItemCard";
import { act } from "react-dom/test-utils";

const testName = "test item";
const testCategory = "Electronics";
const testLocation = "jest";
const testDate = new Date();
const testId = "123";

const renderEl = (image = "") => {
  return render(
    <ItemCard
      name={testName}
      category={testCategory}
      location={testLocation}
      date={testDate}
      id={testId}
      imageUrl={image}
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

describe("Item card component", () => {
  it("renders with correct classes", () => {
    act(() => {
      renderEl();
    });

    const wrapper = screen.queryByTestId("card-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("item-card");
  });

  it("renders without image", () => {
    act(() => {
      renderEl();
    });

    const image = screen.queryByRole("img");
    const noImageIcon = screen.queryByTestId("ImageNotSupportedIcon");
    expect(image).not.toBeInTheDocument();
    expect(noImageIcon).toBeInTheDocument();
  });

  it("renders properly with inputs", () => {
    const mockUrl = "http://localhost:1234567890";
    act(() => {
      renderEl(mockUrl);
    });

    const image = screen.queryByRole("img");
    const name = screen.queryByText(testName);
    const locationText = screen.queryByText(testLocation);
    const dateText = screen.queryByText(testDate.toLocaleDateString("en-SG"));
    const locationIcon = screen.queryByTestId("LocationOnRoundedIcon");
    const dateIcon = screen.queryByTestId("AccessTimeRoundedIcon");

    expect(image).toHaveAttribute("src", mockUrl);
    expect(image).toHaveAttribute("alt", testName);
    expect(name).toBeInTheDocument();
    expect(locationText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
    expect(locationIcon).toBeInTheDocument();
    expect(dateIcon).toBeInTheDocument();
  });
});
