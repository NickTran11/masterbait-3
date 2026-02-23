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
  apiKey: "AIzaSyAhUzDkvbcfp751T9hgvbzN2ZaAOZOxDG0",
  authDomain: "masterbait-b571c.firebaseapp.com",
  projectId: "masterbait-b571c",
  appId: "1:4078870670:web:529f2701c2d27b2ca2e9df"
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
