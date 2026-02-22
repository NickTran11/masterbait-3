// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGznZkHWo8oWNy4BikVXunD5thqDozz_Q",
  authDomain: "login-and-sign-1235.firebaseapp.com",
  projectId: "login-and-sign-1235",
  appId: "1:267563739862:web:4912b4fbb34fde371cf777"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== FUNCTIONS =====
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}