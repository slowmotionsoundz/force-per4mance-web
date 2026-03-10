/**
 * FORCE PER4MANCE — Authentication Module
 */

import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

/**
 * Log in a user (Admin or Player)
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Login Error:", error.code, error.message);
    return { user: null, error: error.message };
  }
}

/**
 * Log out the current user
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout Error:", error);
  }
}

/**
 * Listen for Auth state changes
 */
export function monitorAuthState(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
