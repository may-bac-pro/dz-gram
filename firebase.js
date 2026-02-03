// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Firebase config
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
const auth = getAuth(app);

// Sign Up
document.getElementById('signupBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById('signupMessage').innerText = "Account created!";
    })
    .catch((err) => {
      document.getElementById('signupMessage').innerText = err.message;
    });
});

// Login
document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById('loginMessage').innerText = "Logged in!";
    })
    .catch((err) => {
      document.getElementById('loginMessage').innerText = err.message;
    });
});

// Show feed after login
onAuthStateChanged(auth, (user) => {
  if(user){
    document.getElementById('auth').style.display = "none";
    document.getElementById('feed').style.display = "block";
  } else {
    document.getElementById('auth').style.display = "block";
    document.getElementById('feed').style.display = "none";
  }
});
