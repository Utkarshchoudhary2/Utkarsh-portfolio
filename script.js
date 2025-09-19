function toggleSidebar(){document.getElementById("sidebar").classList.toggle("active");}
tsParticles.load("tsparticles",{background:{color:"#0b0f19"},particles:{number:{value:60},size:{value:2},move:{enable:true,speed:1},links:{enable:true,color:"#3b82f6"}}});
(function(){emailjs.init("MVNLMa6XAnCSIfOnY");})();document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("contact-form");if(form){form.addEventListener("submit",function(e){e.preventDefault();
    emailjs.sendForm("service_6bwckaq","template_otmgn2e",this).then(()=>{document.getElementById("form-status").innerText="✅ Message sent successfully!";this.reset();},(error)=>{document.getElementById("form-status").innerText="❌ Failed to send: "+error.text;});});}});