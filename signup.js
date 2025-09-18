import { app } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('signupBtn');
  signupBtn.addEventListener('click', () => {
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!fullname) { alert("Enter your full name"); return; }
    if (!email) { alert("Enter your email"); return; }
    if (!password) { alert("Enter your password"); return; }
    if (password !== confirmPassword) { alert("Passwords do not match"); return; }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signup successful!");
        window.location.href = "home.html";
      })
      .catch(err => alert("Signup failed: " + err.message));
  });
});
