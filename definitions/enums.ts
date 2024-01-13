enum AuthScreenStagesE {
  _,
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

export enum UserFormFieldKeysE {
  FNKey = "fullName",
  UNKey = "userName",
  PIKey = "profileImage",
  EmailKey = "email",
  LocationKey = "location",
  DescriptionKey = "description",
  SkillsKey = "skills",
  ResumeKey = "resume",
  HeadingKey = "heading",
  LinksKey = "links",
  AppliedJobsKey = "appliedJobs",
  SavedJobskey = "savedJobs",
  CreatedAtKey = "createdAt",
  IdKey = "id",
}

export enum ProfileEditE {
  PROFILE = "profile",
  EMAIL = "email",
  LOCATION = "location",
  DESCRIPTION = "description",
  SKILLS = "skills",
  RESUME = "resume",
  EDUCATION = "education",
}

export enum AuthProviderE {
  Google,
}
export { AuthScreenStagesE, AvatarProgressE };
