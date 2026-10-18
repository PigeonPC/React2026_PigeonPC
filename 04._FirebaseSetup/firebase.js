// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKhB07wHHEHBMjg8YGFjpkoUxGSy3rIO0",
    authDomain: "note-project-17989.firebaseapp.com",
    projectId: "note-project-17989",
    storageBucket: "note-project-17989.firebasestorage.app",
    messagingSenderId: "824814434875",
    appId: "1:824814434875:web:3144757e2bd91952e7ba1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const storage = getStorage(app)

export {app, database, storage}

