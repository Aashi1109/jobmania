import axios from "axios";
import * as Clipboard from "expo-clipboard";
import { Timestamp } from "firebase/firestore";

/**
 * Generates a random file name with a timestamp and a random string.
 * @param {string} extension - The file extension.
 * @param {string} fileName - Optional: The base file name.
 * @returns {string} - The generated random file name.
 */
export function generateRandomFileName(
  extension: string,
  fileName: string = null
): string {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8); // Adjust the length as needed

  return `${
    fileName ? fileName + "@" : ""
  }${timestamp}_${randomString}${extension}`;
}

/**
 * Parses a Firebase Timestamp into a JavaScript Date object.
 * @param {firebase.firestore.Timestamp | Date} date - The date to be formatted, either a Firebase Timestamp or a Date object.
 * @returns {string} - The formatted date string or an empty string if the date is not valid.
 */
export function formatDate(date: Timestamp | Date | undefined): string {
  if (!date) {
    return ""; // Handle missing dates gracefully
  }

  if (date instanceof Timestamp) {
    const dateVal = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    return dateVal.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } else if (date instanceof Date) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } else {
    throw new Error("Invalid date type provided"); // Enforce type safety
  }
}

/**
 * Processes the authentication error message based on the error code.
 * @param {Object} error - The authentication error object.
 * @returns {string} - The processed error message.
 */
export const processAuthErrorMessage = (error) => {
  const errorMessage = error?.message;
  if (errorMessage?.startsWith("@custom@")) {
    return errorMessage.replace("@custom@", "");
  } else {
    console.log("fb error -> ", error.code);
    // Convert error code to lowercase for case-insensitive comparison
    const errorCode = error?.code?.toLowerCase();

    if (!errorCode) {
      return "An error occurred during authentication. Please try again later.";
    }

    // Check if the error code includes a specific substring and return the corresponding message
    if (errorCode.includes("auth/popup-closed-by-user")) {
      return "Authentication cancelled by the user.";
    } else if (errorCode.includes("auth/wrong-password")) {
      return "Incorrect password. Please try again.";
    } else if (errorCode.includes("auth/user-not-found")) {
      return "User not found. Please check your credentials.";
    } else if (errorCode.includes("auth/invalid-email")) {
      return "Invalid email address. Please enter a valid email.";
    } else if (errorCode.includes("auth/email-already-in-use")) {
      return "Email address is already in use. Please choose a different one.";
    } else if (errorCode.includes("auth/weak-password")) {
      return "Weak password. Please choose a stronger one.";
    } else if (errorCode.includes("auth/invalid-credential")) {
      return "Invalid credentails provided";
    } else if (errorCode.includes("auth/invalid-login-credentials")) {
      return "Invalid credentials provided.";
    } else {
      return "An error occurred during authentication. Please try again later.";
    }
  }
};

/**
 * Fetches data using the JSearch API.
 * @param {string} endPoint - The API endpoint.
 * @param {object} query - The query parameters.
 * @returns {Promise<object>} - A promise that resolves to the fetched data.
 */
export const fetchDataJSearch = async (endPoint: string, query: object) => {
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  return response?.data?.data;
};

/**
 * Copies the passed text to the clipboard.
 * @param textToCopy string - The text to paste on clipboard
 * @returns {Promise<void>} - A promise that resolves when the text is copied successfully.
 */
export const copyToClipboard = async (textToCopy: string) => {
  await Clipboard.setStringAsync(textToCopy);
};

/**
 * Fetches the text currently stored in the clipboard.
 * @returns {Promise<string>} - A promise that resolves to the text in the clipboard.
 */
export const fetchCopiedText = async () => {
  const text = await Clipboard.getStringAsync();
  return text;
};
