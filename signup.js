import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signupBtn').addEventListener('click', () => {
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const pw = document.getElementById('password').value.trim();
    const cpw = document.getElementById('confirmPassword').value.trim();

    if (!fullName) { alert("Enter your full name"); return; }
    if (!email) { alert("Enter your email"); return; }
    if (pw.length < 6) { alert("Password must be at least 6 characters"); return; }
    if (pw !== cpw) { alert("Passwords do not match"); return; }

    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        alert("Signup successful!");
        window.location.href = "home.html";
      })
      .catch((err) => {
        alert("Signup failed: " + err.message);
      });
  });
});
