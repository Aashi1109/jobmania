import { AuthScreenStagesE } from "./enums";

interface SkillItemI {
  id: number;
  title: string;
}

interface AuthScreenStagesI {
  stage?: AuthScreenStagesE;
}

export { AuthScreenStagesI, SkillItemI };
