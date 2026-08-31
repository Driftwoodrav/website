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

  // 2. Interactive ABA Mobile Donation Handler
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

      // Detect if user is viewing on iOS or Android mobile browser
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

      // Manage/Create Dynamic Action Notice Box
      let noticeBox = document.getElementById("donationNotice");
      if (!noticeBox) {
        noticeBox = document.createElement("div");
        noticeBox.id = "donationNotice";
        noticeBox.style.cssText =
          "margin-top: 1.25rem; padding: 1rem; border-radius: 10px; font-size: 0.95rem; text-align: left; transition: all 0.3s ease;";
        abaBtn.parentNode.parentNode.appendChild(noticeBox);
      }

      const formattedAmount = `$${amount.toFixed(2)} USD`;

      if (isMobile) {
        // Mobile UX guidance
        noticeBox.style.background = "#e0f2fe";
        noticeBox.style.border = "1px solid #bae6fd";
        noticeBox.style.color = "#0369a1";
        noticeBox.innerHTML = `
          <div style="font-weight: 600; margin-bottom: 0.25rem;">
            <i class="fa-solid fa-circle-info"></i> Ready to Donate ${formattedAmount}:
          </div>
          <p style="margin: 0 0 0.5rem 0; color: #0c4a6e;">
            Save/screenshot the KHQR image below, then open your <strong>ABA Mobile app</strong> and select <strong>Scan QR</strong> from your photos.
          </p>
          <button id="copyAmountBtn" style="background: #0284c7; color: #fff; border: none; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.85rem; cursor: pointer;">
            <i class="fa-solid fa-copy"></i> Copy Amount (${formattedAmount})
          </button>
        `;

        // Handle copying exact amount to clipboard
        const copyBtn = document.getElementById("copyAmountBtn");
        if (copyBtn) {
          copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(amount.toFixed(2)).then(() => {
              copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied ${formattedAmount}!`;
              setTimeout(() => {
                copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Amount (${formattedAmount})`;
              }, 2500);
            });
          });
        }
      } else {
        // Desktop UX guidance
        noticeBox.style.background = "#f0fdf4";
        noticeBox.style.border = "1px solid #bbf7d0";
        noticeBox.style.color = "#15803d";
        noticeBox.innerHTML = `
          <div style="font-weight: 600;">
            <i class="fa-solid fa-circle-check"></i> Amount set to ${formattedAmount}
          </div>
          <p style="margin: 0.25rem 0 0 0; color: #166534;">
            Please open your mobile banking app, scan the KHQR code below, and manually input <strong>${formattedAmount}</strong>.
          </p>
        `;
      }
    });
  }
});
