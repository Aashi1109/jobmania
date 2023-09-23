class User {
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
    fullName: string,
    profileImage: string,
    location: { lat: number; long: number; place: string },
    description: string,
    skills: Array<string>,
    appliedJobs: Array<{
      appliedDate: Date;
      status: "In Process" | "Applied" | "Rejected";
    }>,
  ) {
    this.fullName = fullName;
    this.profileImage = profileImage;
    this.location = location;
    this.description = description;
    this.skills = skills;
    this.appliedJobs = appliedJobs;
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
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(
      data.fullName,
      data.profileImage,
      data.location,
      data.description,
      data.skills,
      data.appliedJobs,
    );
  },
};
