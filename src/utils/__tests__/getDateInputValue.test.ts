import getDateInputValue from "../getDateInputValue";

const testDates = (() => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  return [
    {
      input: "2022-12-12T23:59:59.999Z",
      expected: new Date(
        new Date("2022-12-12T23:59:59.999Z").valueOf() - timezoneOffset
      )
        .toJSON()
        .slice(0, 10),
    },
    {
      input: "2022-12-13T00:00:00.000Z",
      expected: new Date(
        new Date("2022-12-13T00:00:00.000Z").valueOf() - timezoneOffset
      )
        .toJSON()
        .slice(0, 10),
    },
    {
      input: "2022-12-13T00:00:00.001Z",
      expected: new Date(
        new Date("2022-12-13T00:00:00.000Z").valueOf() - timezoneOffset
      )
        .toJSON()
        .slice(0, 10),
    },
    // test cases for Singapore time zone
    {
      input: "2022-12-12T15:59:59.999Z",
      expected: new Date(
        new Date("2022-12-12T15:59:59.999Z").valueOf() - timezoneOffset
      )
        .toJSON()
        .slice(0, 10),
    },
    {
      input: "2022-12-12T16:00:00.001Z",
      expected: new Date(
        new Date("2022-12-12T16:00:00.001Z").valueOf() - timezoneOffset
      )
        .toJSON()
        .slice(0, 10),
    },
  ];
})();

describe("Input element date helper function", () => {
  it("returns date in the correct format", () => {
    testDates.forEach((test) => {
      const inputDate = new Date(test.input);
      const result = getDateInputValue(inputDate);
      expect(result).toStrictEqual(test.expected);
    });
  });
});
