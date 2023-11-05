import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const authFormSchema = yup.object({
  username: yup.string().min(5, "Username should be minimum of 5 characters."),
  email: yup.string().email().required("Email is requried"),
  password: yup
    .string()
    .required("Password is requried")
    .min(8, "Password too short"),
});

export default authFormSchema;
