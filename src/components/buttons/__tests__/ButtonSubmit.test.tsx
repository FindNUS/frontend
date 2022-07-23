import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonSubmit from "../ButtonSubmit";

const dummyClass = "this is a button";
const dummyText = "Lorem ipsum";

describe("Submit button component", () => {
  it("renders class correctly", () => {
    render(<ButtonSubmit className={dummyClass} text={dummyText} />);

    const btn = screen.getByRole("button");

    expect(btn).toHaveClass(dummyClass);
  });

  it("renders text correctly", () => {
    render(<ButtonSubmit className={dummyClass} text={dummyText} />);

    const btn = screen.getByRole("button");

    expect(btn).toHaveTextContent(dummyText);
  });

  it("is of type submit", async () => {
    render(<ButtonSubmit className={dummyClass} text={dummyText} />);

    const btn = screen.getByRole("button");

    expect(btn).toHaveAttribute("type", "submit");
  });
});
