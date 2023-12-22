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

interface AuthContextProps {
  user: User | null; // Replace with your actual user type
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserData: (updateData: object) => Promise<any>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null); // Replace with your actual user type
  const [loading, setLoading] = useState(true);
  const authHelpers = new AuthHelpers();

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await authHelpers.authObserver();
      if (isAuthenticated) {
        // Fetch the latest user data here if needed
        const userFirestore = new UserFirestoreService();
        const userData = await userFirestore.getUserById(isAuthenticated);
        setUser(userData);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);
  console.log("user -> ", user);

  const signIn = async (email: string, password: string) => {
    try {
      const userId = await authHelpers.signIn(email, password);
      // Fetch and update user data if needed
      const userFirestore = new UserFirestoreService();
      const userData = await userFirestore.getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userId = await authHelpers.signUp(email, password);
      // Fetch and update user data if needed
      const userFirestore = new UserFirestoreService();
      const userData = await userFirestore.getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authHelpers.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const updateUserData = async (updateData: object) => {
    // Assume you have a method in your UserFirestoreService to update user data
    try {
      const userFirestore = new UserFirestoreService();
      await userFirestore.updateUser(user.id, updateData);
      // Fetch and update the user data after the update
      const updatedUser = await userFirestore.getUserById(user.id);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error; // Rethrow the error
    }
  };

  const values: AuthContextProps = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
