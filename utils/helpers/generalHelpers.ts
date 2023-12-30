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
export function formatDate(date) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date?.toLocaleDateString("en-US", options);
}

/**
 * Processes the authentication error message based on the error code.
 * @param {Object} error - The authentication error object.
 * @returns {string} - The processed error message.
 */
export const processAuthErrorMessage = (error) => {
  console.log("fb error -> ", error.code);
  // Convert error code to lowercase for case-insensitive comparison
  const errorCode = error.code.toLowerCase();

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
};
