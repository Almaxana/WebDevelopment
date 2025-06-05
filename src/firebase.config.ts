// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbVhNVNr5YQgGPBAjZahqm5apK-h-Y0vs",
  authDomain: "myrest-b4d35.firebaseapp.com",
  projectId: "myrest-b4d35",
  storageBucket: "myrest-b4d35.firebasestorage.app",
  messagingSenderId: "526626293865",
  appId: "1:526626293865:web:87ca149ee311f05d6f3af8",
  measurementId: "G-LN3CHQCLSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);