import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
  it("renders with loading message", () => {
    render(<Loading />);

    const msg = screen.getByText("Loading...");

    expect(msg).toBeInTheDocument();
  });

  it("renders with class if required", () => {
    render(<Loading className="test" />);

    const wrapper = screen.getByTestId("loading-wrapper");

    expect(wrapper).toHaveClass("test");
  });
});
