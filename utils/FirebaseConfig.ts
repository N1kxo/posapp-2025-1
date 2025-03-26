// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAREZW-8PWl_sNhnyVWoofb38VGNX35gHk",
  authDomain: "nico-santi-posapp-2025-1.firebaseapp.com",
  projectId: "nico-santi-posapp-2025-1",
  storageBucket: "nico-santi-posapp-2025-1.firebasestorage.app",
  messagingSenderId: "58666758417",
  appId: "1:58666758417:web:6c89c4a9ac1e43dea91cb0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
