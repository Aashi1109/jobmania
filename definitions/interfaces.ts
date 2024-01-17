import { FieldValue } from "firebase/firestore";
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
    type?: "success" | "error" | "info";
    popupHead?: string;
    id?: number;
  }[];
}
export interface UserModelI {
  fullName?: string;
  userName?: string;
  profileImage?: { profileUrl: string; createdAt?: FieldValue };
  email?: string;
  location?: { lat: number; long: number; address: string };
  description?: string;
  skills?: SkillItemI[];
  resume?: { fileName: string; resumeUrl: string; createdAt?: FieldValue };
  heading?: string;
  links?: Object;
  appliedJobs?: [];
  savedJobs?: [];
  createdAt?: FieldValue;
  id?: string;
}

export { AuthScreenStagesI, SkillItemI, AuthFormInputsI, IPopup };
