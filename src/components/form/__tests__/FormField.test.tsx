import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import FormField from "../FormField";
import { act } from "react-dom/test-utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyOnChange = (ev: React.FormEvent) => {
  return;
};

const generateEl = (
  isDisabled: boolean,
  type = "text",
  defaultValue?: string
) => {
  return (
    <FormField
      labelContent="formfield label"
      onChange={dummyOnChange}
      disabled={isDisabled}
      type={type}
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

describe("Form field component", () => {
  it("renders label content", () => {
    render(generateEl(false));

    const labelEl = screen.getByText("formfield label");

    expect(labelEl).toBeInTheDocument();
  });

  it("initial class name is correct", () => {
    render(generateEl(false));

    const labelEl = screen.getByText("formfield label");

    expect(labelEl.parentElement).toHaveClass("form-field");
    expect(labelEl).toHaveClass("form-field__label");
  });

  it("renders input element and not textarea", () => {
    render(generateEl(false));

    const inputEl = screen.getByRole("textbox");

    expect(inputEl).toBeVisible();
    expect(inputEl).toHaveClass("form-field__input");
    expect(inputEl).not.toHaveClass("form-field__textarea");
  });

  it("renders textarea element and not input", () => {
    render(generateEl(false, "textarea"));

    const textareaEl = screen.getByRole("textbox");

    expect(textareaEl).toBeVisible();
    expect(textareaEl).toHaveClass("form-field__textarea");
    expect(textareaEl).not.toHaveClass("form-field__input");
  });

  it("marks field as edited", () => {
    act(() => {
      render(generateEl(false));
    });

    const inputWrapper = screen.getByTestId("form-field-container");
    expect(inputWrapper.getAttribute("data-edited")).toStrictEqual("false");

    act(() => {
      const inputEl = screen.getByRole("textbox");
      fireEvent.change(inputEl, {
        target: { value: "Lorem ipsum" },
      });
    });

    expect(inputWrapper.getAttribute("data-edited")).toStrictEqual("true");
  });

  it("marks initial value as edited if user types", () => {
    act(() => {
      render(generateEl(false, "text", "hello world!"));
    });

    const inputWrapper = screen.getByTestId("form-field-container");
    const inputEl = screen.getByRole("textbox");
    expect(inputWrapper.getAttribute("data-edited")).toStrictEqual("false");
    expect(inputEl).toHaveValue("hello world!");

    act(() => {
      fireEvent.change(inputEl, {
        target: { value: "Lorem ipsum" },
      });
    });

    expect(inputWrapper.getAttribute("data-edited")).toStrictEqual("true");
    expect(inputEl).toHaveValue("Lorem ipsum");
  });

  // it("label class is updated when textbox is clicked", () => {
  //   render(generateEl(false));

  //   const inputEl = screen.getByRole("textbox");

  //   userEvent.click(inputEl);
  //   const labelEl = screen.getByText("formfield label");

  //   expect(labelEl).toHaveClass("form-field__label form-field__label--focus");
  // });
});
