// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh2f8pJCTozqpSD_YKQaSUhbiRFhLBnnc",
  authDomain: "twitter-clone-9fa4c.firebaseapp.com",
  projectId: "twitter-clone-9fa4c",
  storageBucket: "twitter-clone-9fa4c.appspot.com",
  messagingSenderId: "616366745241",
  appId: "1:616366745241:web:d661fa3f8ed9d491773a08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ! Yetkilendirme kurulumu
export const auth = getAuth(app);

// ! Google İle Giriş

export const provider = new GoogleAuthProvider();
// veri tabanı referansı alma
export const db = getFirestore(app);

// * Medyaları depolayacağımız Yer
export const storage = getStorage(app);
