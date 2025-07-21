import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuratie - vervang deze waarden met je eigen Firebase project gegevens
const firebaseConfig = {
  apiKey: "AIzaSyBWSYH6aGDBPAiGkNCoX91H5PO1XbSRAWc",
  authDomain: "shopping-list-e7a70.firebaseapp.com",
  projectId: "shopping-list-e7a70",
  storageBucket: "shopping-list-e7a70.firebasestorage.app",
  messagingSenderId: "229419963479",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app; 