// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "artzoro-pm.firebaseapp.com",
  projectId: "artzoro-pm",
  storageBucket: "artzoro-pm.appspot.com",
  messagingSenderId: "74144993775",
  appId: "1:74144993775:web:d2258b535c7ae1e0e6661a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
