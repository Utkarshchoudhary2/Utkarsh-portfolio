
// Debug-friendly login & signup handlers with alert()

document.addEventListener('DOMContentLoaded', function(){

  // Login handler
  document.getElementById('loginBtn').addEventListener('click', function(e){
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pw = document.getElementById('login-password').value.trim();

    if(!email){ alert("Enter your email"); return; }
    if(pw.length < 6){ alert("Password too short"); return; }

    getAuth().signInWithEmailAndPassword(email, pw)
      .then(userCredential => {
        alert("Login successful!");
        window.location.href = "home.html";
      })
      .catch(err => {
        alert("Login failed: " + err.message);
      });
  });

  // Signup handler
  document.getElementById('signupBtn').addEventListener('click', function(e){
    e.preventDefault();
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const pw = document.getElementById('password').value.trim();
    const cpw = document.getElementById('confirmPassword').value.trim();

    if(!fullName){ alert("Enter your full name"); return; }
    if(!email){ alert("Enter your email"); return; }
    if(pw.length < 6){ alert("Password too short"); return; }
    if(pw !== cpw){ alert("Passwords do not match"); return; }

    getAuth().createUserWithEmailAndPassword(email, pw)
      .then(userCredential => {
        alert("Signup successful!");
        window.location.href = "home.html";
      })
      .catch(err => {
        alert("Signup failed: " + err.message);
      });
  });

});
