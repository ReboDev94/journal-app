// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyD37LeWvHJtjlNL5tqWw5y4NRBnDy_c6wE",
  authDomain: "journalapp-2c27b.firebaseapp.com",
  projectId: "journalapp-2c27b",
  storageBucket: "journalapp-2c27b.appspot.com",
  messagingSenderId: "437439001228",
  appId: "1:437439001228:web:9525b1daae31c1b15fc1a9",
  measurementId: "G-5YP7T59EYE",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDb = getFirestore(FirebaseApp);
