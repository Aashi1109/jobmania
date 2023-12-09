import * as Yup from "yup";

export const stageFourSchema = Yup.object().shape({
  portfolio: Yup.string().url("Invalid URL. Please enter a valid URL."),
  other: Yup.string().url("Invalid URL. Please enter a valid URL."),
});

export const stageTwoSchema = Yup.object().shape({
  fullName: Yup.string().min(2).required(),
  about: Yup.string().required(),
  profileHeading: Yup.string().optional(),
  location: Yup.string().min(5).required(),
});
