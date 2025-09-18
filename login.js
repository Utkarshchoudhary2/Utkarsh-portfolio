import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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
  document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const pw = document.getElementById('login-password').value.trim();

    if (!email) { alert("Enter your email"); return; }
    if (pw.length < 6) { alert("Password must be at least 6 characters"); return; }

    signInWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        alert("Login successful!");
        window.location.href = "home.html";
      })
      .catch((err) => {
        alert("Login failed: " + err.message);
      });
  });
});
