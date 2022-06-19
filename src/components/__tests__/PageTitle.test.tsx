import React from "react";
import { render } from "@testing-library/react";
import PageTitle from "../PageTitle";

describe("Page title component", () => {
  const testTitle = "This is a title";
  const testMessage = "This is a message";

  it("title renders properly", () => {
    const { getByText } = render(
      <PageTitle title={testTitle} message={testMessage} />
    );

    const title = getByText(testTitle);

    expect(title).toBeInTheDocument();
  });

  it("message renders properly", () => {
    const { getByText } = render(
      <PageTitle title={testTitle} message={testMessage} />
    );

    const message = getByText(testMessage);

    expect(message).toBeInTheDocument();
  });
});
