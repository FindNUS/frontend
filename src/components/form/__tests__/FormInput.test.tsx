/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import FormInput from "../FormInput";
import { act } from "react-dom/test-utils";

const generateEl = (defaultValue?: string) => {
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
      defaultValue={defaultValue}
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

describe("Text area component", () => {
  it("has the correct class", () => {
    render(generateEl());

    const inputEl = screen.getByRole("textbox");

    expect(inputEl).toHaveClass("form-field__input");
  });

  it("renders with initial value", () => {
    act(() => {
      render(generateEl("hello world!"));
    });

    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveValue("hello world!");
  });
  // it("types", () => {
  //   render(generateEl());

  //   const inputEl = screen.getByRole("textbox");

  //   userEvent.type(inputEl, "Lorem ipsum");

  //   expect(inputEl).toHaveValue("Lorem ipsum");
  // });
});
