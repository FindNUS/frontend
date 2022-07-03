import type { IMGUR_THUMBNAIL_SIZES } from "../../constants";

/**
 * Add thumbnail suffix on to given Imgur URL
 *
 * @param url The Imgur URL in the form i.imgur.com/XXXXXXXX.jpg
 * @param size The thumbnail size (s, b, t, m, l, h)
 * @returns Imgur thumbnail URL i.imgur.com/XXXXXXXX<size>.jpg
 */
export default function (url: string, size: IMGUR_THUMBNAIL_SIZES): string {
  const urlArr = url.split(".");
  const len = urlArr.length;

  const front = urlArr.slice(0, len - 2);
  const target = urlArr.slice(len - 2, len - 1);
  const back = urlArr.slice(len - 1, len);

  return [...front, `${target}${size}`, ...back].join(".");
}
