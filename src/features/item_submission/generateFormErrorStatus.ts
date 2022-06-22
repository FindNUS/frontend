import { RequiredField } from "../../constants";

/**
 * Determine whether the form inputs have errors
 * @param status The array containing the identifier, required and completed
 * statuses for each input field
 * @returns Array containing the identifier and whether the input is valid
 */
const generateFormErrorStatus = (status: RequiredField[]) =>
  status.map((input) => {
    const { completed, required, identifier } = input;
    // input is required by default
    if (required && !completed) return { identifier, error: true };
    // input is not required by default but must be filled in (contact details)
    if (!required && completed !== undefined && !completed)
      return { identifier, error: true };
    // input is optional
    if (!required && completed === undefined)
      return { identifier, error: false };
    // input is valid
    return { identifier, error: false };
  });

export default generateFormErrorStatus;
