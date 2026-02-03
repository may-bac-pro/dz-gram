// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChOnmVexMUh8i3Y-yZsGfyMU-zqTw6nu0",
  authDomain: "dz-gram.firebaseapp.com",
  projectId: "dz-gram",
  storageBucket: "dz-gram.firebasestorage.app",
  messagingSenderId: "975512793382",
  appId: "1:975512793382:web:1867177f0e316fdb2191e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

document.getElementById('signupBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById('signupMessage').innerText = "Account created successfully!";
    })
    .catch((error) => {
      document.getElementById('signupMessage').innerText = error.message;
    });
});
