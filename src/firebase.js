// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCeQ8ZSkJGihiQ1EG19aCLv0Qx779sZu4c",
  authDomain: "metasync-cleanservice.firebaseapp.com",
  projectId: "metasync-cleanservice",
  storageBucket: "metasync-cleanservice.appspot.com",
  messagingSenderId: "279708270078",
  appId: "1:279708270078:web:43b6018388c8e44a3c54af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Firestore export
