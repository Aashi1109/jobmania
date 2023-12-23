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
   * @returns {string} - User ID
   */
  signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.authRef,
        email,
        password
      );
      const userId = userCredential.user.uid;
      return userId;
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  /**
   * Sign in a user in firebase
   * @param email - Email of existing user
   * @param password - Password of existing user
   * @returns {string} - User ID
   */
  signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.authRef,
        email,
        password
      );
      const userId = userCredential.user.uid;
      return userId;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  /**
   * Listens for changes in the auth state of the user and returns a boolean indicating it.
   * If the user is authenticated, returns the user ID.
   * If the user is not authenticated, returns null.
   * @returns {string | null} - User ID or null if not authenticated
   */
  authObserver = () => {
    return new Promise<string | null>((resolve) => {
      onAuthStateChanged(this.authRef, (user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
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
    // Set custom parameters to always prompt for account selection
    googleProvider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(this.authRef, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("operation type -> ", result.operationType);
      return { user: result.user, token };
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
