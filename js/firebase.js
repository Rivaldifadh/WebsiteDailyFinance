// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// =======================
// Firebase Configuration
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyDeRGq8Ax6VkjrDJ4zBVUJb3ip2OUYugJw",
  authDomain: "websitedailyfinance.firebaseapp.com",
  projectId: "websitedailyfinance",
  storageBucket: "websitedailyfinance.firebasestorage.app",
  messagingSenderId: "131234044538",
  appId: "1:131234044538:web:67c5dc8e23fd15e88939c3",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);

// Inisialisasi Authentication
const auth = getAuth(app);

// Export agar bisa dipakai file lain
export { app, db, auth };
