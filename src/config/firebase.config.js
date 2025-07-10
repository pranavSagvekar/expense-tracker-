// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import {Firestore, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC8XNSD8Z2oEkMQuY8S35Vj-4dhEF9smY",
  authDomain: "expense-aaefb.firebaseapp.com",
  projectId: "expense-aaefb",
  storageBucket: "expense-aaefb.firebasestorage.app",
  messagingSenderId: "460195327630",
  appId: "1:460195327630:web:2b604ea13efcb09752a3df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()