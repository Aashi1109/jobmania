import { UserModelI } from "@/definitions/interfaces";
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
  createdAt: FieldValue;
  savedJobs: Array<{
    jobId: string;
    savedAt: Date;
    employer_logo: string;
    job_title: string;
    job_employment_type: string;
  }>;
  links: Object;

  constructor(userData: UserModelI) {
    this.id = userData.id;
    this.userName = userData.userName;
    this.fullName = userData.fullName;
    this.profileImage = {
      ...userData.profileImage,
      createdAt: serverTimestamp(),
    };
    this.location = userData.location;
    this.description = userData.description;
    this.skills = userData.skills;
    this.appliedJobs = userData.appliedJobs;
    this.email = userData.email;
    this.resume = { ...userData.resume, createdAt: serverTimestamp() };
    this.heading = userData.heading;
    this.createdAt = userData.createdAt ?? serverTimestamp();
    this.links = userData.links;
    this.savedJobs = userData.savedJobs;
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
      createdAt: user.createdAt,
      links: user.links,
      savedJobs: user.savedJobs,
    };
  },
  fromFirestore: (snapshot: any, options: any): User => {
    const data = snapshot.data(options);
    return new User({
      fullName: data.fullName,
      userName: data.userName,
      profileImage: data.profileImage,
      email: data.email,
      location: data.location,
      description: data.description,
      skills: data.skills,
      resume: data.resume,
      heading: data.heading,
      links: data.links,
      appliedJobs: data.appliedJobs,
      savedJobs: data.savedJobs,
      createdAt: data.createdAt,
      id: snapshot.id,
    });
  },
};

export default User;
