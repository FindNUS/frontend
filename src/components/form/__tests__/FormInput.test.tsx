/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import FormInput from "../FormInput";

const generateEl = () => {
  return (
    <FormInput
      type="text"
      disabled={false}
      onFocus={() => {
        return;
      }}
      onBlur={() => {
        return;
      }}
      onChange={(ev: React.FormEvent) => {
        return;
      }}
    />
  );
};

describe("Text area component", () => {
  it("has the correct class", () => {
    render(generateEl());

    const inputEl = screen.getByRole("textbox");

    expect(inputEl).toHaveClass("form-field__input");
  });

  // it("types", () => {
  //   render(generateEl());

  //   const inputEl = screen.getByRole("textbox");

  //   userEvent.type(inputEl, "Lorem ipsum");

  //   expect(inputEl).toHaveValue("Lorem ipsum");
  // });
});
