import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../Card";

const generateEl = (className?: string) => (
  <Card className={className}>
    <div data-testid="card-child">Lorem ipsum</div>
  </Card>
);

describe("Card component", () => {
  it("has the correct class", () => {
    render(generateEl());

    const wrapper = screen.getByTestId("card-wrapper");

    expect(wrapper).toHaveClass("card");
  });

  it("renders with additional classes", () => {
    render(generateEl("test"));

    const wrapper = screen.getByTestId("card-wrapper");

    expect(wrapper).toHaveClass("card test");
  });

  it("renders child elements", () => {
    render(generateEl());

    const child = screen.getByTestId("card-child");

    expect(child).toHaveTextContent("Lorem ipsum");
  });
});
