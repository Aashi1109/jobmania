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
      alert(error?.message ?? "Something went wrong.");
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
      alert(error?.message ?? "Something went wrong");
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
      return null;
    }
  };
}