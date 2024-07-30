import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as admin from "firebase-admin";
import serviceAccount from "./serviceaccount.json";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env" });
}

const firebaseConfig = {
  apiKey: process.env.BACKEND_FIREBASE_API_KEY,
  authDomain: process.env.BACKEND_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.BACKEND_FIREBASE_PROJECT_ID,
  storageBucket: process.env.BACKEND_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.BACKEND_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.BACKEND_FIREBASE_APP_ID,
  measurementId: process.env.BACKEND_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let analytics;
if (typeof window !== "undefined" && window.navigator) {
  const { getAnalytics, isSupported } = require("firebase/analytics");
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ebuddy-fc10f.firebaseio.com",
});

export { app, db, admin, analytics };
