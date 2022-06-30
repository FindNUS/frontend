import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavItem from "../NavItem";

const dummyText = "Lorem ipsum";
const linkDest = "/login";

const generateEl = (
  link: boolean,
  handler = function () {
    return;
  }
) => {
  if (!link) return <NavItem text={dummyText} />;

  return (
    <MemoryRouter initialEntries={["/"]}>
      <NavItem text={dummyText} to={linkDest} onClick={handler} />
    </MemoryRouter>
  );
};
describe("Nav item component", () => {
  it("has the correct class", () => {
    render(generateEl(true, jest.fn()));

    const linkEl = screen.getByRole("link");
    const navEl = screen.getByRole("listitem");

    expect(linkEl).toHaveClass("link--wrapper");
    expect(navEl).toHaveClass("nav__item");
  });

  it("renders text properly", () => {
    render(generateEl(true, jest.fn()));

    const navEl = screen.getByRole("listitem");

    expect(navEl).toHaveTextContent(dummyText);
  });

  it("handles onClick function", () => {
    const mockOnClick = jest.fn();
    render(generateEl(true, mockOnClick));

    const navEl = screen.getByRole("listitem");
    fireEvent.click(navEl);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should redirect when clicked", () => {
    const mockOnClick = jest.fn();
    render(generateEl(true, mockOnClick));

    const linkEl = screen.getByRole("link");

    expect(linkEl).toHaveAttribute("href", linkDest);
  });
});
