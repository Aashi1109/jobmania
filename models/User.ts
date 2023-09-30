class User {
  id: string;
  email: string;
  fullName: string;
  profileImage: string;
  location: { lat: number; long: number; place: string };
  description: string;
  skills: Array<string>;
  appliedJobs: Array<{
    appliedDate: Date;
    status: "In Process" | "Applied" | "Rejected";
  }>;

  constructor(
    id: string,
    fullName: string,
    profileImage: string,
    email: string,
    location: { lat: number; long: number; place: string },
    description: string,
    skills: Array<string>,
    appliedJobs: Array<{
      appliedDate: Date;
      status: "In Process" | "Applied" | "Rejected";
    }>
  ) {
    this.id = id;
    this.fullName = fullName;
    this.profileImage = profileImage;
    this.location = location;
    this.description = description;
    this.skills = skills;
    this.appliedJobs = appliedJobs;
    this.email = email;
  }
}

const userConverter = {
  toFirestore: (user: User) => {
    return {
      fullName: user.fullName,
      profileImage: user.profileImage,
      appliedJobs: user.appliedJobs,
      skills: user.skills,
      location: user.location,
      description: user.description,
    };
  },
  fromFirestore: (snapshot: any, options: any): User => {
    const data = snapshot.data(options);
    return new User(
      snapshot.id,
      data.fullName,
      data.profileImage,
      data.email,
      data.location,
      data.description,
      data.skills,
      data.appliedJobs
    );
  },
};
