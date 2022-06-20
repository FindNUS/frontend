/**
 * Returns the first instance of the value matching the given key
 * @param arr The array containing key-value pairs
 * @param key The key to find the value of
 */
const getArrayObjectValueFromKey = (
  arr: { value: string; key: string }[],
  key: string
) => arr.filter((item) => item.key === key)[0].value;

export default getArrayObjectValueFromKey;
