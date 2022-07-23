import React from "react";
import { render, screen } from "@testing-library/react";
import NoImage from "../NoImage";

describe("No image component", () => {
  it("renders with correct icon", () => {
    render(<NoImage />);

    const img = screen.getByTestId("ImageNotSupportedIcon");

    expect(img).toBeInTheDocument();
  });

  it("has the correct class", () => {
    render(<NoImage />);

    const wrapper = screen.getByTestId("noimage-wrapper");

    expect(wrapper).toHaveClass("no-image");
  });

  it("renders with class if required", () => {
    render(<NoImage className="test" />);

    const wrapper = screen.getByTestId("noimage-wrapper");

    expect(wrapper).toHaveClass("no-image test");
  });
});
