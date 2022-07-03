import {
  COUNTRY_CODE_SG,
  REGEX_E164_NUMBER,
  REGEX_MOBILE_SG,
} from "../../../constants";

export default function (phone: string): string | undefined {
  // phone number is from Singapore
  if (phone.match(REGEX_MOBILE_SG)) return `+${COUNTRY_CODE_SG}${phone}`;
  // valid E164 number (+<country code><number>)
  if (phone.match(REGEX_E164_NUMBER)) return phone;
  return undefined;
}
