// Import necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYfvE48YTaGDwt99K6osmAxWlPoR_XMwI",
    authDomain: "population-people.firebaseapp.com",
    databaseURL: "https://population-people-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "population-people",
    storageBucket: "population-people.appspot.com",
    messagingSenderId: "903797492762",
    appId: "1:903797492762:web:37bda609620ac62b6555a3",
    measurementId: "G-ZD8Q45RTLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export the Firestore instance
export default db;
