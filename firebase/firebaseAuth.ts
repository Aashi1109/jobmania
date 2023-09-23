import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
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
      alert(error?.messages ?? "Something went wrong.");
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
    } catch (e) {
      alert(e?.messages ?? "Something went wrong");
    }
  };

  /**
   * Listens for change in auth state of user and returns boolean indicating it
   */
  authObserver = () => {
    onAuthStateChanged(this.authRef, (user) => {
      return !!user;
    });
  };

  /**
   * Sign-out the currently sign-in user
   */
  signOut = () => {};

  /**
   * Handles authentication using google
   */
  googleAuth = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(this.authRef, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const message = error.message;

        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
}
