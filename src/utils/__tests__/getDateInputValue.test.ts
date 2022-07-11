import getDateInputValue from "../getDateInputValue";

const testDates = [
  { input: "2022-12-13T00:00:00.000Z", expected: "2022-12-13" },
  { input: "2022-12-12T15:59:59.999Z", expected: "2022-12-12" }, // adjust for Singapore Time
  { input: "2022-12-12T16:00:00.000Z", expected: "2022-12-13" }, // adjust for Singapore Time
  { input: "2022-12-12T16:00:00.001Z", expected: "2022-12-13" },
];

describe("Input element date helper function", () => {
  it("returns date in the correct format", () => {
    testDates.forEach((test) => {
      const inputDate = new Date(test.input);
      const result = getDateInputValue(inputDate);
      expect(result).toStrictEqual(test.expected);
    });
  });
});
