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

    // ABA Mobile App Trigger
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

            // Check if user is on iOS or Android mobile device
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const isAndroid = /android/i.test(userAgent);
            const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

            if (!isAndroid && !isIOS) {
                alert(
                    `Mobile device required. Please scan the KHQR code below using your ABA app and enter $${amount.toFixed(2)} USD manually.`
                );
                return;
            }

            // ABA Custom App Scheme & Universal Link Fallback
            // Direct deep link format used by Cambodian banking links
            const abapyScheme = `abamobilebank://pay?account=018986181&amount=${amount.toFixed(2)}&currency=USD`;
            const fallbackUrl = `https://m.abahouse.com/pay?account=018986181&amount=${amount.toFixed(2)}&currency=USD`;

            // Try launching ABA via direct custom scheme
            const startTime = Date.now();
            window.location.href = abapyScheme;

            // Fallback redirect if the app is not installed or scheme fails within 1.5 seconds
            setTimeout(function () {
                if (Date.now() - startTime < 2000) {
                    window.location.href = fallbackUrl;
                }
            }, 1500);
        });
    }
});
