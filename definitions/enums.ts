enum AuthScreenStagesE {
  INTIAL,
  LOGIN,
  REGISTER,
  CHECK_EMAIL_EXISTS,
  FORGOT_PASSWORD,
  REGISTER_STAGE_2,
  REGISTER_STAGE_3,
  REGISTER_STAGE_4,
  REGISTER_COMPLETE,

  // Providers auth
  GOOGLE_AUTH,
}
enum AvatarProgressE {
  Nothing = 0,
  ImagePresent = 0.001,
  Stage2 = 0.25,
  Stage3 = 0.5,
  Stage4 = 0.75,
  Complete = 1,
}

export enum AuthProviderE {
  Google,
}
export { AuthScreenStagesE, AvatarProgressE };
