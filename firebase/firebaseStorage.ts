import {
  deleteObject,
  FirebaseStorage,
  getBytes,
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";

import app from "./firebaseConfig";

/**
 * Service class for interacting with Firebase Storage.
 */
class FirebaseStorageService {
  storage: FirebaseStorage;
  storageRef: StorageReference;
  /**
   * Creates an instance of FirebaseStorageService.
   * @param {string} parentPath - The parent path for storage references.
   */
  constructor(parentPath: string) {
    this.storage = getStorage(app);
    this.storageRef = ref(this.storage, parentPath);
  }

  /**
   * Uploads a file to Firebase Storage.
   * @param {File|Uint8Array} file - The file to upload.
   * @param {string} fileName - The name to give to the uploaded file.
   * @throws {Error} Throws an error if the upload fails.
   * @returns {Promise<string>} A promise that resolves to the download URL of the uploaded file.
   */
  async uploadFile(file: File | Uint8Array | Blob, fileName: string) {
    try {
      const fileRef = ref(this.storageRef, fileName);
      const uploadTask = await uploadBytes(fileRef, file);

      return await getDownloadURL(uploadTask.ref);
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }

  /**
   * Downloads a file from Firebase Storage.
   * @param {string} filePath - The path to the file to download.
   * @throws {Error} Throws an error if the download fails.
   * @returns {Promise<Uint8Array>} A promise that resolves to the downloaded file as a Uint8Array.
   */
  async downloadFile(filePath: string) {
    try {
      const httpsReference = ref(this.storage, filePath);
      const downloadFile = await getBytes(httpsReference);
      return new Uint8Array(downloadFile);
    } catch (error) {
      throw new Error(`Error downloading file: ${error.message}`);
    }
  }

  /**
   * Deletes a file from Firebase Storage.
   * @param {string} fileUrl - The URL of the file to delete.
   * @throws {Error} Throws an error if the deletion fails.
   * @returns {Promise<void>} A promise that resolves when the file is successfully deleted.
   */
  async deleteFile(fileUrl: string) {
    try {
      // Use ref() to create a reference from the URL
      const fileRef = ref(this.storageRef, fileUrl);

      // Delete the file reference
      await deleteObject(fileRef);
    } catch (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }
}

export default FirebaseStorageService;
