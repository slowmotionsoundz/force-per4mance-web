/**
 * FORCE PER4MANCE — Firebase Configuration
 * 
 * Replace the placeholder values with your actual Firebase project configuration.
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4UeCVJg2_Y038BW2oHYK09BXHSF5npx0",
  authDomain: "force-per4mance.firebaseapp.com",
  projectId: "force-per4mance",
  storageBucket: "force-per4mance.firebasestorage.app",
  messagingSenderId: "722371777413",
  appId: "1:722371777413:web:dc30fedbe413746e6caaec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
