/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import FormInput from "../FormInput";
import { act } from "react-dom/test-utils";

const generateEl = (props: {
  defaultValue?: string;
  value?: string;
  min?: string;
  max?: string;
}) => {
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
      {...props}
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
    render(generateEl({}));

    const inputEl = screen.getByRole("textbox");

    expect(inputEl).toHaveClass("form-field__input");
  });

  it("renders with initial value", () => {
    act(() => {
      render(generateEl({ defaultValue: "hello world!" }));
    });

    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveValue("hello world!");
  });

  it("renders date input with min and max", () => {
    act(() => {
      render(
        generateEl({
          value: "2021-12-13",
          min: "2021-12-09",
          max: "2022-01-09",
        })
      );
    });

    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toHaveValue("2021-12-13");
    expect(inputEl).toHaveAttribute("min", "2021-12-09");
    expect(inputEl).toHaveAttribute("max", "2022-01-09");
  });

  // it("types", () => {
  //   render(generateEl({}));

  //   const inputEl = screen.getByRole("textbox");

  //   userEvent.type(inputEl, "Lorem ipsum");

  //   expect(inputEl).toHaveValue("Lorem ipsum");
  // });
});
