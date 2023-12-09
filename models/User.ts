import { serverTimestamp, FieldValue } from "firebase/firestore";

class User {
  id?: string;
  email: string;
  fullName: string;
  userName: string;
  profileImage: { profileUrl: string; createdAt: FieldValue };
  location: { lat: number; long: number; address: string };
  resume: { fileName: string; resumeUrl: string; createdAt: FieldValue };
  description: string;
  heading: string;
  skills: Array<string>;
  appliedJobs: Array<{
    appliedDate: FieldValue;
    status: "In Process" | "Applied" | "Rejected";
  }>;

  constructor(
    fullName: string,
    userName: string,
    profileImage: { profileUrl: string },
    email: string,
    location: { lat: number; long: number; address: string },
    description: string,
    skills: Array<string>,
    appliedJobs: Array<{
      appliedDate: FieldValue;
      status: "In Process" | "Applied" | "Rejected";
    }>,
    resume: { fileName: string; resumeUrl: string },
    heading: string,
    id?: string
  ) {
    this.id = id;
    this.userName = userName;
    this.fullName = fullName;
    this.profileImage = { ...profileImage, createdAt: serverTimestamp() };
    this.location = location;
    this.description = description;
    this.skills = skills;
    this.appliedJobs = appliedJobs;
    this.email = email;
    this.resume = { ...resume, createdAt: serverTimestamp() };
    this.heading = heading;
  }
}

export const userConverter = {
  toFirestore: (user: User) => {
    return {
      email: user.email,
      userName: user.userName,
      fullName: user.fullName,
      profileImage: user.profileImage,
      appliedJobs: user.appliedJobs,
      skills: user.skills,
      location: user.location,
      description: user.description,
      resume: user.resume,
      heading: user.heading,
    };
  },
  fromFirestore: (snapshot: any, options: any): User => {
    const data = snapshot.data(options);
    return new User(
      data.fullName,
      data.userName,
      data.profileImage,
      data.email,
      data.location,
      data.description,
      data.skills,
      data.appliedJobs,
      data.resume,
      data.heading,
      data.id
    );
  },
};

export default User;
