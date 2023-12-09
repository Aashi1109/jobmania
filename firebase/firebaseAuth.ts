import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutUser, // Renamed to avoid conflicts
} from "firebase/auth";
import app from "./firebaseConfig";

/**
 * Contains methods for authentication of `User` using `Firebase` auth service
 */
class AuthHelpers {
  authRef: Auth;

  constructor() {
    this.authRef = getAuth(app);
  }

  /**
   * Creates new user auth in firebase
   * @param email - Email of new user
   * @param password - Password of new user
   */
  signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(this.authRef, email, password);
    } catch (error: any) {
      // alert(error?.message ?? "Something went wrong.");
      throw error; // Re-throw the error for potential further handling
    }
  };

  /**
   * Signin a user in firebase
   * @param email - Email of existing user
   * @param password - Password of existing user
   */
  signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(this.authRef, email, password);
    } catch (error) {
      // alert(error?.message ?? "Something went wrong");
      throw error; // Re-throw the error for potential further handling
    }
  };

  /**
   * Listens for changes in the auth state of the user and returns a boolean indicating it.
   * @returns {boolean} - `true` if the user is authenticated, `false` otherwise.
   */
  authObserver = () => {
    // Use a Promise to handle the asynchronous nature of onAuthStateChanged
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(this.authRef, (user) => {
        resolve(!!user);
      });
    });
  };

  /**
   * Sign-out the currently signed in user
   */
  signOut = async () => {
    try {
      await signOutUser(this.authRef);
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  };

  /**
   * Handles Google authentication.
   * @returns {Promise<User | null>} A promise that resolves with the authenticated user data, or `null` if authentication fails.
   */
  googleAuth = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(this.authRef, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      return result.user;
    } catch (error) {
      console.error("Google authentication error:", error);
      throw error;
    }
  };

  /**
   * Checks if a user with the given email already exists in Firebase.
   * @param email - Email to check for existence.
   * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the email already exists.
   */
  checkIfEmailExists = async (email: string): Promise<boolean> => {
    let userCredential;
    try {
      // Attempt to create a new user
      userCredential = await createUserWithEmailAndPassword(
        this.authRef,
        email,
        "dummyPassword"
      );
    } catch (error) {
      // If the error is due to an existing email, return true
      if (error.code === "auth/email-already-in-use") {
        return true;
      }

      // Otherwise, re-throw the error for potential further handling
      throw error;
    } finally {
      // Always delete the temporary user, whether successful or not
      await userCredential?.user?.delete();
    }
  };
}

export default AuthHelpers;
