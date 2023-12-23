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
export const processAuthErrorMessage = (error) => {
  switch (error.code) {
    case "auth/popup-closed-by-user":
      return "Authentication cancelled by the user.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/user-not-found":
      return "User not found. Please check your credentials.";
    case "auth/invalid-email":
      return "Invalid email address. Please enter a valid email.";
    case "auth/email-already-in-use":
      return "Email address is already in use. Please choose a different one.";
    case "auth/weak-password":
      return "Weak password. Please choose a stronger one.";
    case "auth/invalid-login-credentials":
      return "Invalid credentials provided.";
    default:
      return "An error occurred during authentication. Please try again later.";
  }
};
