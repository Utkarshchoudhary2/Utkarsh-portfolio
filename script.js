// Init particles background
tsParticles.load("tsparticles", {
  background: { color: "#0b0f19" },
  particles: {
    number: { value: 60 },
    size: { value: 2 },
    move: { enable: true, speed: 1 },
    links: { enable: true, color: "#3b82f6" }
  }
});

// Smooth scroll for nav links (sidebar + topnav)
document.querySelectorAll('.sidebar a[href^="#"], .topnav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Highlight active section in nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.sidebar a[href^="#"], .topnav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== Contact Form with EmailJS =====
(function() {
  emailjs.init("MVNLMa6XAnCSIfOnY"); 
})();

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_6bwckaq", "template_otmgn2e", this)
    .then(() => {
      document.getElementById("form-status").innerText = "✅ Message sent successfully!";
      this.reset();
    }, (error) => {
      document.getElementById("form-status").innerText = "❌ Failed to send: " + error.text;
    });
});
