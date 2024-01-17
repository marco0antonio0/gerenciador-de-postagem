// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
require("dotenv").config();

// Load environment variables from .env file
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDMBvTZYTq7Oo4Jo2tbU6dSvM7aplsY0Fo",
//   authDomain: "teste-f8e0e.firebaseapp.com",
//   projectId: "teste-f8e0e",
//   storageBucket: "teste-f8e0e.appspot.com",
//   messagingSenderId: "23447785083",
//   appId: "1:23447785083:web:157cd9738b3b429c275cde",
// };
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MENSAGINSENDER,
  appId: process.env.NEXT_PUBLIC_APPID,
};

// var apiKey: string = process.env.NEXT_PUBLIC_APIKEY!;
// var authDomain: string = process.env.NEXT_PUBLIC_AUTHDOMAIN!;
// var projectId: string = process.env.NEXT_PUBLIC_PROJECTID!;
// var storageBucket: string = process.env.NEXT_PUBLIC_STORAGEBUCKET!;
// var messagingSenderId: string = process.env.NEXT_PUBLIC_MENSAGINSENDER!;
// var appId: string = process.env.NEXT_PUBLIC_APPID!;

// Initialize Firebase
const appxx = initializeApp(firebaseConfig);
const auth = getAuth(appxx);
const db = getDatabase(appxx);
export { appxx, auth, db };
