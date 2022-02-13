// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIV1dM88NdtpCeHftIQ2hzCR7sRvzay1c",
  authDomain: "askforworkwebsite.firebaseapp.com",
  projectId: "askforworkwebsite",
  storageBucket: "askforworkwebsite.appspot.com",
  messagingSenderId: "391472217899",
  appId: "1:391472217899:web:c6a3bb0dc945333e3c4f6e",
  measurementId: "G-QKGNFB56G8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, inMemoryPersistence);

const analytics = getAnalytics(app);

export default app;
export { auth, analytics };
