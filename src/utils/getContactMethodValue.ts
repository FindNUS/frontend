import { SUBMIT_FOUND_CONTACT_METHODS } from "../constants";

const getContactMethodValue = (key: string) => {
  return SUBMIT_FOUND_CONTACT_METHODS.filter(
    (method) => method.key === key.toLowerCase()
  )[0].value;
};

export default getContactMethodValue;
