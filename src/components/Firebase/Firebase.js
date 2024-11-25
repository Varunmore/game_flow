// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import './.env';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyvjKxcq79YRfLtcnasWSx8lPXlUyRgiA",
  authDomain: "gameflow-e4995.firebaseapp.com",
  databaseURL: "https://gameflow-e4995-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gameflow-e4995",
  storageBucket: "gameflow-e4995.firebasestorage.app",
  messagingSenderId: "877955805506",
  appId: "1:877955805506:web:a6ac6d082ed16c64d358db",
  measurementId: "G-1L372DSK76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Function to set up the invisible reCAPTCHA
export const setupRecaptcha = (containerId) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId, // This is the container element for Recaptcha
    {
      size: "invisible", // Make it invisible
      callback: (response) => {
        // This will get called when Recaptcha is successfully verified
        console.log("Recaptcha verified:", response);
      },
      "expired-callback": () => {
        // Handle the expired case
        console.log("Recaptcha expired. Please refresh the page.");
      },
    },
    getAuth() // Initialize Firebase Authentication instance
  );

  // Render the recaptcha into the container
  window.recaptchaVerifier.render();
};
