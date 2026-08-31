document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true" || false;
      mobileMenuBtn.setAttribute("aria-expanded", !expanded);
    });
  }

  // 2. ABA Mobile App Direct Launcher
  const abaBtn = document.getElementById("openAbaBtn");

  if (abaBtn) {
    abaBtn.addEventListener("click", function (e) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

      if (!isMobile) {
        e.preventDefault();
        alert("Mobile device required. Please open this page on your mobile phone to launch the ABA Mobile app, or scan the KHQR code below.");
      }
      // On mobile devices, the native link click propagates to invoke the 'abamobilebank://' scheme cleanly.
    });
  }
});