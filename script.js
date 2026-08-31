document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navRightContainer = document.querySelector('.nav-right-container');
  const navItems = document.querySelectorAll('.nav-item, .btn-gallery-nav');

  // Toggle mobile navigation menu open/close
  if (mobileMenuBtn && navRightContainer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navRightContainer.classList.toggle('active');
      
      // Toggle menu icon between bars and X
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navRightContainer.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile dropdown when clicking any link/button inside
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navRightContainer.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close menu when clicking anywhere outside the navbar
    document.addEventListener('click', (e) => {
      if (!navRightContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navRightContainer.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
});