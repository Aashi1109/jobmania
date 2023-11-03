import * as Yup from "yup";

export const stageThreeSchema = Yup.object().shape({
  portfolio: Yup.string().url("Invalid URL. Please enter a valid URL."),
  other: Yup.string().url("Invalid URL. Please enter a valid URL."),
});
