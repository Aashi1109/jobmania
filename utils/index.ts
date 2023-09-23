import { DUMMY_IMAGE_URL } from "@/constants";

export const checkReturnImageUrl = (url: string) => {
  if (!url) return DUMMY_IMAGE_URL;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i",
    );
    return pattern.test(url) ? url : DUMMY_IMAGE_URL;
  }
};

// firebase related functions
