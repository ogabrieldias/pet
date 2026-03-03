// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAkrzoTuFZZyJfu8zDarha9DuDte26V1dE",
  authDomain: "pet-vida-57176.firebaseapp.com",
  projectId: "pet-vida-57176",
  storageBucket: "pet-vida-57176.firebasestorage.app",
  messagingSenderId: "1080490962701",
  appId: "1:1080490962701:web:1b2872d2a9dee5b0104a44",
}

// 🔥 Evita erro de múltiplas inicializações no Next
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// 🔥 EXPORTA O DB AQUI
export const db = getFirestore(app)