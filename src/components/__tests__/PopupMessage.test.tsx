import React from "react";
import { render } from "@testing-library/react";
import PopupMessage from "../PopupMessage";

describe("Popup message component", () => {
  const testStatus = "success";
  const testMessage = "This is a success message";

  it("status is updated in class", () => {
    const { getByTestId } = render(
      <PopupMessage status={testStatus} message={testMessage} />
    );

    const popup = getByTestId("popup-msg");

    expect(popup).toHaveClass(`popup-msg popup-msg--${testStatus}`);

    expect(popup).toBeInTheDocument();
  });

  it("message renders properly", () => {
    const { getByText } = render(
      <PopupMessage status={testStatus} message={testMessage} />
    );

    const popupMessage = getByText(testMessage);

    expect(popupMessage).toBeInTheDocument();
  });
});
