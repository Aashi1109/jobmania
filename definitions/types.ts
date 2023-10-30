import { Path, UseFormRegister } from "react-hook-form";
import { AuthFormInputsI } from "./interfaces";

type InputProps = {
  label: Path<AuthFormInputsI>;
  register: UseFormRegister<AuthFormInputsI>;
};

export { InputProps };
