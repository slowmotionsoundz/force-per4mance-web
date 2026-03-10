/**
 * FORCE PER4MANCE — Database Module (Firestore)
 */

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

/**
 * Submit a new player application (Local or International)
 */
export async function submitApplication(data) {
  try {
    const docRef = await addDoc(collection(db, "applications"), {
      ...data,
      status: "pending",
      submittedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Submission Error:", error);
    return { id: null, error: error.message };
  }
}

/**
 * Update the status of a player application
 * @param {string} id - The document ID of the application
 * @param {string} status - The new status (e.g., 'approved', 'rejected')
 */
export async function updateApplicationStatus(id, status) {
  try {
    const appRef = doc(db, "applications", id);
    await updateDoc(appRef, { status, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.error("Error updating application status:", error);
    return { error: error.message };
  }
}

/**
 * Fetch all applications (for Admin)
 */
export async function getAllApplications() {
  try {
    const querySnapshot = await getDocs(collection(db, "applications"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

/**
 * Update player profile data
 */
export async function updatePlayerProfile(uid, data) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Update Error:", error);
    return false;
  }
}

/**
 * Initialize a Scout profile
 */
export async function createScoutProfile(uid, data) {
  try {
    await setDoc(doc(db, "users", uid), {
      ...data,
      role: 'scout',
      verified: false,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Scout Profile Creation Error:", error);
    return false;
  }
}

/**
 * Fetch only approved players for discovery
 */
export async function getApprovedPlayers() {
  try {
    const q = query(collection(db, "users"), where("role", "==", "player"), where("status", "==", "approved"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Fetch Players Error:", error);
    return [];
  }
}
