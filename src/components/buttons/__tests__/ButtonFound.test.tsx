import React from "react";
import { render } from "@testing-library/react";
import ButtonFound from "../ButtonFound";

describe("Button found component", () => {
  it("renders properly", () => {
    const { getByText } = render(<ButtonFound />);

    const btn = getByText("Found Item").parentElement;

    expect(btn).toBeInTheDocument();
  });
});
