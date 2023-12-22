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
  setDoc,
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
   * @param customId - (Optional) A custom ID for the user document. If not provided, Firestore will generate a random ID.
   * @returns The ID of the newly added user document.
   */
  async addUserToCollection(
    documentData: User,
    customId?: string
  ): Promise<string> {
    let docRef;

    if (customId) {
      // If customId is provided, use it to create a reference
      docRef = doc(this.userCollectionRef, customId);
    } else {
      // If customId is not provided, use addDoc to let Firestore generate a random ID
      docRef = await addDoc(this.userCollectionRef, {
        ...documentData,
        createdAt: serverTimestamp(),
      });
    }

    await setDoc(docRef, documentData); // Set the data on the reference

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
  async updateUser(userId, userUpdateData: object): Promise<void> {
    const docRef = doc(this.userCollectionRef, userId);

    const updateDone = await updateDoc(docRef, userUpdateData);
    return updateDone;
  }
}

export default UserFirestoreService;
