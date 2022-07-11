import { IMGUR_THUMBNAIL_MEDUIM } from "../../../constants";
import getImgurThumbnailUrl from "../getImgurThumbnailUrl";

const image = "https://i.imgur.com/XXXXXXX.jpg";
const thumb_m = `https://i.imgur.com/XXXXXXX${IMGUR_THUMBNAIL_MEDUIM}.jpg`;

describe("Get imgur thumbnail link function", () => {
  it("outputs url with thumbnail size", () => {
    const output = getImgurThumbnailUrl(image, IMGUR_THUMBNAIL_MEDUIM);
    expect(output).toStrictEqual(thumb_m);
  });
});
