// functions for CRUD operations in firestore
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import User, { userConverter } from "../models/User";
import app from "./firebaseConfig";
import { USER_COLLECTION_NAME } from "./constants";

/**
 * Contains CRUD methods for `users` collection.
 */
class UserFirestoreService {
  dbRef: Firestore;
  collectionName: string;
  userCollectionRef: CollectionReference;

  constructor() {
    this.collectionName = USER_COLLECTION_NAME;
    this.dbRef = getFirestore(app);
    this.userCollectionRef = collection(
      this.dbRef,
      this.collectionName
    ).withConverter(userConverter);
  }

  /**
   * Add a user to the `users` collection.
   * @param documentData - An object containing the data of the user to be added. By default, the `createdAt` field is added for you, so you do not need to pass it in.
   * @returns The ID of the newly added user document.
   */
  async addUserToCollection(documentData: User): Promise<string> {
    const docRef = await addDoc(this.userCollectionRef, {
      ...documentData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }

  /**
   * Get a user from the `users` collection by their ID.
   * @param docId - The ID of the user document to get.
   * @returns The user object, or `null` if the user does not exist.
   */
  async getUserById(docId: string): Promise<User | null> {
    const docRef = doc(this.userCollectionRef, docId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as User;
    } else {
      return null;
    }
  }

  /**
   * Update the data of a user in the `users` collection.
   * @param user - The user to update.
   * @returns A promise that resolves when the update is complete.
   */
  async updateUser(user: User): Promise<void> {
    const docRef = doc(this.userCollectionRef, user.id);

    return await updateDoc(docRef, {
      fullName: user.fullName,
      profileImage: user.profileImage,
      appliedJobs: user.appliedJobs,
      skills: user.skills,
      location: user.location,
      description: user.description,
    });
  }
}

export default UserFirestoreService;
