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
