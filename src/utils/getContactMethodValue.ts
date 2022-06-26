import { SUBMIT_FOUND_CONTACT_METHODS, UNKNOWN_VALUE } from "../constants";

const getContactMethodValue = (key: string) => {
  if (!key || key === UNKNOWN_VALUE) return undefined;
  return SUBMIT_FOUND_CONTACT_METHODS.filter(
    (method) => method.key === key.toLowerCase()
  )[0].value;
};

export default getContactMethodValue;
