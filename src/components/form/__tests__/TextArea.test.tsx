import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import TextArea from "../TextArea";
import { act } from "react-dom/test-utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyOnChange = (ev: React.FormEvent<HTMLTextAreaElement>) => {
  return;
};

let isFocus = false;
const onFocusChange = () => {
  isFocus = !isFocus;
};

const generateEl = (props: { defaultValue?: string; value?: string }) => (
  <TextArea
    onChange={dummyOnChange}
    isFocus={isFocus}
    onFocusChange={onFocusChange}
    {...props}
  />
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

describe("Text area component", () => {
  it("initial class name is correct", () => {
    render(generateEl({}));

    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveClass("form-field__textarea");
  });

  it("renders with default value", () => {
    act(() => {
      render(generateEl({ defaultValue: "hello world!" }));
    });

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("hello world!");
  });

  it("renders with initial value", () => {
    act(() => {
      render(generateEl({ value: "hello world!" }));
    });

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("hello world!");
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
