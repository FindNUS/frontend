export default function (date: Date) {
  // convert UTC date to local date
  const minutes = date.getMinutes() - date.getTimezoneOffset();
  date.setMinutes(minutes);
  return date.toJSON().slice(0, 10);
}
