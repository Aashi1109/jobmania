// functions for CRUD operations in firestore
import {addDoc, collection, doc, Firestore, getDoc, getFirestore, serverTimestamp,} from "firebase/firestore";
import app from "./firebaseConfig";
import {USER_COLLECTION_NAME} from "./constants";

/**
 * Contains CRUD methods for `users` collection.
 */
class UserFirestoreService {
  dbRef: Firestore;
  collectionName: string;

  constructor() {
    this.collectionName = USER_COLLECTION_NAME;
    this.dbRef = getFirestore(app);
  }

  /**
   * Add document in `user` collection
   * @param documentData - Data object to insert in the collection. By default, createdAt is inserted no need to pass it.
   */
  addDocToCollection = async (documentData: object) => {
    const docRef = await addDoc(collection(this.dbRef, this.collectionName), {
      ...documentData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  };

  /**
   * Retrieve a document by its ID
   */
  getDocumentById = async (docId: string) => {
    const docRef = doc(this.dbRef, this.collectionName, docId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    }
  };
}
