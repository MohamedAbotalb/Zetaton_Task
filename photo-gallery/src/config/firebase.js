import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtFLzLW0QIKdholO_DDEMcvbYzKRrDgSM",
  authDomain: "pexels-photo-gallery.firebaseapp.com",
  projectId: "pexels-photo-gallery",
  storageBucket: "pexels-photo-gallery.appspot.com",
  messagingSenderId: "692944518232",
  appId: "1:692944518232:web:cc029be713d33e42591e2d",
  measurementId: "G-D337WV44HL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
