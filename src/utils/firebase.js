// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRY1KDU6tvu2RDg_OPt15mCcNrpF6Gfjs",
  authDomain: "netflixgpt-a0b26.firebaseapp.com",
  projectId: "netflixgpt-a0b26",
  storageBucket: "netflixgpt-a0b26.appspot.com",
  messagingSenderId: "432583546977",
  appId: "1:432583546977:web:61f2eb8a4329e10b983220",
  measurementId: "G-V5CKNKR1Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
console.log(auth);