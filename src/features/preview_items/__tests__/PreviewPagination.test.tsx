import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PreviewPagination from "../PreviewPagination";
import { act } from "react-dom/test-utils";

const renderEl = (
  pageNumber: number,
  isLastPage: boolean,
  className?: string,
  handleBack = () => {
    return;
  },
  handleNext = () => {
    return;
  }
) => {
  return render(
    <PreviewPagination
      pageNumber={pageNumber}
      isLast={isLastPage}
      className={className}
      handleBack={handleBack}
      handleNext={handleNext}
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

describe("Preview pagination component", () => {
  it("renders with the correct class", () => {
    act(() => {
      renderEl(1, false, "test");
    });

    const wrapper = screen.queryByTestId("preview-pagination-wrapper");
    expect(wrapper).toHaveClass("preview-pagination test");
  });

  it("renders page number correctly", () => {
    act(() => {
      renderEl(12345, false, "");
    });

    const pageNumber = screen.getByText(/page/i);
    expect(pageNumber).toHaveTextContent("Page 12345");
  });

  it("renders first page without back button", () => {
    act(() => {
      renderEl(1, false, "");
    });

    const backBtn = screen.queryByTestId("preview-pagination-back");
    const nextBtn = screen.queryByTestId("preview-pagination-next");
    expect(backBtn).not.toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it("renders both back and next button", () => {
    act(() => {
      renderEl(2, false, "");
    });

    const backBtn = screen.queryByTestId("preview-pagination-back");
    const nextBtn = screen.queryByTestId("preview-pagination-next");
    expect(backBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it("renders last page without next button", () => {
    act(() => {
      renderEl(5, true, "");
    });

    const backBtn = screen.queryByTestId("preview-pagination-back");
    const nextBtn = screen.queryByTestId("preview-pagination-next");
    expect(backBtn).toBeInTheDocument();
    expect(nextBtn).not.toBeInTheDocument();
  });

  it("handles the back and next functions on click", () => {
    const mockHandleBack = jest.fn();
    const mockHandleNext = jest.fn();

    act(() => {
      const { getByTestId } = renderEl(
        2,
        false,
        "",
        mockHandleBack,
        mockHandleNext
      );
      const backBtn = getByTestId("preview-pagination-back");
      const nextBtn = getByTestId("preview-pagination-next");
      fireEvent.click(backBtn);
      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);
    });

    expect(mockHandleBack).toHaveBeenCalledTimes(1);
    expect(mockHandleNext).toHaveBeenCalledTimes(2);
  });
});
