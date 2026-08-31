document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Navigation Menu ---
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navRightContainer = document.querySelector(".nav-right-container");

    if (mobileMenuBtn && navRightContainer) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navRightContainer.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (
                navRightContainer.classList.contains("active") &&
                !navRightContainer.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)
            ) {
                navRightContainer.classList.remove("active");
            }
        });
    }
    // --- Donation Page Interactive Logic ---
    const amountBtns = document.querySelectorAll(".amount-btn");
    const customAmountInput = document.getElementById("customAmount");
    const btnAmountText = document.getElementById("btnAmountText");
    const paymentOptions = document.querySelectorAll(".payment-option");
    const donationForm = document.getElementById("donationForm");
    const thankYouModal = document.getElementById("thankYouModal");
    const closeModalBtn = document.getElementById("closeModalBtn");

    if (donationForm) {
        // Sync amount buttons with custom input & button text
        amountBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                amountBtns.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                const val = btn.getAttribute("data-amount");
                if (customAmountInput) customAmountInput.value = val;
                if (btnAmountText) btnAmountText.textContent = val;
            });
        });

        if (customAmountInput) {
            customAmountInput.addEventListener("input", (e) => {
                amountBtns.forEach((b) => b.classList.remove("active"));
                const val = e.target.value || 0;
                if (btnAmountText) btnAmountText.textContent = val;
            });
        }

        // Toggle Payment Option Active State
        paymentOptions.forEach((option) => {
            option.addEventListener("click", () => {
                paymentOptions.forEach((o) => o.classList.remove("active"));
                option.classList.add("active");
                const radio = option.querySelector("input[type='radio']");
                if (radio) radio.checked = true;
            });
        });

        // Handle Form Submit
        donationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (thankYouModal) {
                thankYouModal.classList.add("active");
            }
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", () => {
                thankYouModal.classList.remove("active");
                donationForm.reset();
                btnAmountText.textContent = "5";
                amountBtns[0].click();
            });
        }
    }
    // --- Lightbox Modal Logic ---
    const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let currentIndex = 0;

    if (lightboxModal && lightboxImg && galleryImages.length > 0) {
        // Function to show image at specific index
        const showImage = (index) => {
            if (index < 0) {
                currentIndex = galleryImages.length - 1;
            } else if (index >= galleryImages.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            const targetImg = galleryImages[currentIndex];
            lightboxImg.src = targetImg.src;
            lightboxImg.alt = targetImg.alt || "Enlarged photo";
        };

        // Open lightbox when clicking any gallery image
        galleryImages.forEach((img, idx) => {
            img.addEventListener("click", (e) => {
                e.stopPropagation();
                showImage(idx);
                lightboxModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent background scrolling
            });
        });

        // Close Lightbox
        const closeLightbox = () => {
            lightboxModal.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
        };

        // Close button click
        if (lightboxClose) {
            lightboxClose.addEventListener("click", (e) => {
                e.stopPropagation();
                closeLightbox();
            });
        }

        // Prev button click
        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", (e) => {
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
        }

        // Next button click
        if (lightboxNext) {
            lightboxNext.addEventListener("click", (e) => {
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        }

        // Close when clicking directly on dark backdrop (outside controls/image)
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        // Keyboard Controls (Left, Right, Escape)
        document.addEventListener("keydown", (e) => {
            if (!lightboxModal.classList.contains("active")) return;

            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showImage(currentIndex - 1);
            if (e.key === "ArrowRight") showImage(currentIndex + 1);
        });
    }
});
