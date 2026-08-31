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
      e.preventDefault();

      // Check if user is viewing on an iOS or Android mobile device
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

      if (!isMobile) {
        alert("Mobile device required. Please open this page on your phone to launch the ABA app, or scan the KHQR code below.");
        return;
      }

      // Deep link to open the ABA Mobile app directly on iOS/Android
      window.location.href = "abamobilebank://";
    });
  }
});
