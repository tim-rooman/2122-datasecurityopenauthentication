// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS74fCLBtgnYv_srgUrn2YJP0XXlZP5vo",
  authDomain: "openauthproofofconcept.firebaseapp.com",
  projectId: "openauthproofofconcept",
  storageBucket: "openauthproofofconcept.appspot.com",
  messagingSenderId: "936945897277",
  appId: "1:936945897277:web:1f78265e3818bf5a96ff54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const authentication = getAuth(app);

export { authentication, db };
