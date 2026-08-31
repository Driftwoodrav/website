document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true" || false;
      mobileMenuBtn.setAttribute("aria-expanded", !expanded);
    });
  }

  // ABA Mobile App Trigger (Official Bakong Web Endpoint)
  const abaBtn = document.getElementById("openAbaBtn");
  const amountInput = document.getElementById("donationAmount");

  if (abaBtn) {
    abaBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const rawAmount = amountInput ? amountInput.value : "";
      const amount = parseFloat(rawAmount);

      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      // Detect mobile OS
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

      if (!isMobile) {
        alert(
          `Mobile device required. Please scan the KHQR code below using your ABA app and enter $${amount.toFixed(2)} USD manually.`
        );
        return;
      }

      // Account details for CHANNIZA LONG (USD)
      const accountNo = "018986181";
      const accountName = "CHANNIZA LONG";

      // Official Bakong Web Endpoint (Fixes "Dynamic Link Not Found" error)
      const bakongPayUrl = `https://km.bakong.nbc.gov.kh/pay?account=${accountNo}&amount=${amount.toFixed(2)}&currency=USD&name=${encodeURIComponent(accountName)}`;

      // Redirect to Bakong payment page
      window.location.href = bakongPayUrl;
    });
  }
});