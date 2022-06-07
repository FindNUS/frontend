import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import TextArea from "../TextArea";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyOnChange = (ev: React.FormEvent<HTMLTextAreaElement>) => {
  return;
};

let isFocus = false;
const onFocusChange = () => {
  isFocus = !isFocus;
};

const generateEl = () => (
  <TextArea
    onChange={dummyOnChange}
    isFocus={isFocus}
    onFocusChange={onFocusChange}
  />
);

describe("Text area component", () => {
  it("initial class name is correct", () => {
    render(generateEl());

    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveClass("form-field__textarea");
  });

  // it("focus class is added on focus", () => {
  //   render(generateEl());

  //   const textarea = screen.getByRole("textbox");

  //   // simulate focus event
  //   // textarea.dispatchEvent(new FocusEvent("focus"));
  //   userEvent.click(textarea);

  //   // check if class was added
  //   expect(textarea).toHaveClass(
  //     "form-field__textarea form-field__textarea--focus"
  //   );
  // });

  // it("types", () => {
  //   render(generateEl());

  //   const textarea = screen.getByRole("textbox");

  //   userEvent.type(textarea, "Lorem ipsum");

  //   expect(textarea).toHaveValue("Lorem ipsum");
  // });
});
