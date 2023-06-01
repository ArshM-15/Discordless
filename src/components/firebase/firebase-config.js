// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvR3nzuuochADjnU13bagADhJtJM2NIvs",
  authDomain: "chat-app-c2877.firebaseapp.com",
  projectId: "chat-app-c2877",
  storageBucket: "chat-app-c2877.appspot.com",
  messagingSenderId: "429454717031",
  appId: "1:429454717031:web:6da55b0247d73e5ddde4c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
