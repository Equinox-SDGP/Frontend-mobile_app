// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database"; // Import the database module

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_MoNxyTWMXJbQJqBM57e7GtAewcnZ1mI",
  authDomain: "equinox-d890e.firebaseapp.com",
  databaseURL: "https://equinox-d890e-default-rtdb.firebaseio.com",
  projectId: "equinox-d890e",
  storageBucket: "equinox-d890e.appspot.com",
  messagingSenderId: "507614658299",
  appId: "1:507614658299:web:31f3b5a2f5fd7c1057fa5e",
  measurementId: "G-3LS9PBLS6K"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// Get authentication and database instances
const auth = firebase.auth();
const db = firebase.database();

// Export the auth and database modules
export { auth, db };
