// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFcDnsY3GHuHfduMdekja77Fx4D-1gTj8",
  authDomain: "learnfirebase1-8fc98.firebaseapp.com",
  projectId: "learnfirebase1-8fc98",
  storageBucket: "learnfirebase1-8fc98.appspot.com",
  messagingSenderId: "272811509443",
  appId: "1:272811509443:web:fb83f90379c5f9ffdf0476",
  measurementId: "G-09DE768QG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();