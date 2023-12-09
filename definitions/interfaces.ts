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

interface IPopup {
  showPopup: boolean;
  count: number;
  prevPopupTime?: number;
  popups: {
    message: string;
    type: "success" | "error" | "info";
    popupHead: string;
    id?: number;
  }[];
}

export { AuthScreenStagesI, SkillItemI, AuthFormInputsI, IPopup };
