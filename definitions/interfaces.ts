import { AuthScreenStagesE } from "./enums";

interface SkillItemI {
  id: number;
  title: string;
}

interface AuthScreenStagesI {
  stage?: AuthScreenStagesE;
  data?: AuthFormInputsI;
}

interface AuthFormInputsI {
  username?: string;
  email: string;
  password: string;
}

export { AuthScreenStagesI, SkillItemI, AuthFormInputsI };
