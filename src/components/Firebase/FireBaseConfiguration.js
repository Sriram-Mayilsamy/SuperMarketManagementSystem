// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOsADKU9iXzz5PtLILuNpbQsPrh_GDmpc",
  authDomain: "reactproject-9a510.firebaseapp.com",
  projectId: "reactproject-9a510",
  storageBucket: "reactproject-9a510.appspot.com",
  messagingSenderId: "680084898969",
  appId: "1:680084898969:web:ceed127a0933119c87a408",
  measurementId: "G-8HC0CP4TXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it for use in your components
export const auth = getAuth(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);
