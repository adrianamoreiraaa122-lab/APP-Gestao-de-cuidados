import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBO4oAtlPxb_srWBh211M0JPcVVFjnnLOE",
  authDomain: "healthsenior-98bad.firebaseapp.com",
  projectId: "healthsenior-98bad",
  storageBucket: "healthsenior-98bad.firebasestorage.app",
  messagingSenderId: "428577170544",
  appId: "1:428577170544:web:4a3484b050cd302149c0b5",
  measurementId: "G-R0YJ80FWEX"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
