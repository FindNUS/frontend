/**
 * Returns the first instance of the key matching the given value
 * @param arr The array containing key-value pairs
 * @param value The value to find the key of
 */
const getArrayObjectKeyFromValue = (
  arr: { value: string; key: string }[],
  value: string
) => arr.filter((item) => item.value === value)[0].key;

export default getArrayObjectKeyFromValue;
