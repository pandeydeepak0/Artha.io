// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjuh1l38c3fq_uYF8lwrcNLjgfPxPWuHc",
  authDomain: "artha-13152.firebaseapp.com",
  projectId: "artha-13152",
  storageBucket: "artha-13152.appspot.com",
  messagingSenderId: "615950489083",
  appId: "1:615950489083:web:6d9f6fc152b2f9b5f3e75e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);