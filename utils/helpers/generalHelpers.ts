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
