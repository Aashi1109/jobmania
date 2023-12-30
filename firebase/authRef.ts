import { getAuth } from "firebase/auth";
import app from "./firebaseConfig";
const authRef = getAuth(app);

export default authRef;
