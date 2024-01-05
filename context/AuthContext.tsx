// AuthContext.js

import AuthHelpers from "@/firebase/firebaseAuth";
import UserFirestoreService from "@/firebase/firebaseFirestore";
import User from "@/models/User";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePopup } from "./PopupContext";

/**
 * AuthContextProps interface defines the shape of the authentication context.
 */
interface AuthContextProps {
  user: User | null; // Replace with your actual user type
  loading: boolean;
  // isUserInvalid: boolean;
  signIn: (email: string, password: string) => Promise<string>;
  signUp: (email: string, password: string) => Promise<string>;
  signOut: () => Promise<void>;
  updateUserData: (updateData: object) => Promise<any>;
  getSetUser: (userId: string) => Promise<any>;
}

/**
 * AuthContext is a React context that provides authentication-related values.
 */
const AuthContext = createContext<AuthContextProps | null>(null);

/**
 * AuthProviderProps interface defines the props for the AuthProvider component.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider is a React component that manages the authentication state.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Replace with your actual user type
  const [loading, setLoading] = useState<boolean>(true);
  // const [isUserInvalid, setIsUserInvalid] = useState(false);
  const authHelpers = new AuthHelpers();
  const userFirestore = new UserFirestoreService();

  const { dispatch: dispatchPopup } = usePopup();

  useEffect(() => {
    /**
     * fetchUser is an async function that checks if a user is authenticated
     * and fetches user data if authenticated.
     */
    const fetchUser = async () => {
      const isAuthenticated = await authHelpers.authObserver();
      if (isAuthenticated) {
        // Fetch the latest user data here if needed
        await getSetUser(isAuthenticated);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  /**
   * signIn is an async function that signs in a user with the provided email and password.
   * It fetches and updates user data if needed.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {string} - Id of the logged in user
   */
  const signIn = async (email: string, password: string): Promise<string> => {
    try {
      const userId = await authHelpers.signIn(email, password);
      // Fetch and update user data if needed
      // await getSetUser(userId);
      return userId;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  /**
   * signUp is an async function that signs up a new user with the provided email and password.
   * It fetches and updates user data if needed.
   *
   * @param {string} email - The new user's email address.
   * @param {string} password - The new user's password.
   * @returns {string} - Id of the created user
   */
  const signUp = async (email: string, password: string): Promise<string> => {
    try {
      const userId = await authHelpers.signUp(email, password);
      // Fetch and update user data if needed
      // await getSetUser(userId);
      return userId;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  /**
   * signOut is an async function that signs out the current user.
   */
  const signOut = async (): Promise<void> => {
    try {
      await authHelpers.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  /**
   * updateUserData is an async function that updates the user data with the provided updateData.
   * It fetches and updates the user data after the update.
   *
   * @param {object} updateData - The data to update for the user.
   */
  const updateUserData = async (updateData: object): Promise<any> => {
    // Assume you have a method in your UserFirestoreService to update user data
    try {
      await userFirestore.updateUser(user.id, updateData);
      // Fetch and update the user data after the update
      await getSetUser(user.id);
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error; // Rethrow the error
    }
  };

  /**
   * getSetUser is an async function that gets user data by ID, sets it in the state,
   * and returns the fetched user data.
   *
   * @param {string} userId - The ID of the user to fetch.
   * @returns {User | null} - The fetched user data or null if an error occurs.
   */
  const getSetUser = async (userId: string): Promise<User | null> => {
    try {
      const userData = await userFirestore.getUserById(userId);

      if (userData && userId) {
        setUser(userData);
        // setIsUserInvalid(false);
      } else {
        const isUserDeleted = await authHelpers.deleteUser();
        if (!isUserDeleted) {
          dispatchPopup({
            type: "CREATE_POPUP",
            payload: { message: "Unable to delete user" },
          });
        }
        dispatchPopup({
          type: "CREATE_POPUP",
          payload: { message: "Something went wrong. Try signup again" },
        });
        // setIsUserInvalid(true);
      }

      setUser(userData);
      return userData;
    } catch (error) {
      console.error(`Error getting userData with id -> ${userId}`, error);
      return null;
    }
  };

  const values: AuthContextProps = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserData,
    getSetUser,
    // isUserInvalid,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

/**
 * useAuth is a custom hook that retrieves the authentication context.
 *
 * @returns {AuthContextProps} - The authentication context values.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
