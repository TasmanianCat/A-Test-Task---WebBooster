// Manage classes for the navigation
document.addEventListener('DOMContentLoaded', () => {
  const navWrapper = document.querySelector('.nav-wrapper');
  const navScrollThreshold = 40; // = 2.5rem

  window.addEventListener('scroll', () => {
    if (window.scrollY > navScrollThreshold) {
      navWrapper.classList.add('nav-wrapper-fixed');
    } else {
      navWrapper.classList.remove('nav-wrapper-fixed');
    }
  });
});

// Change color for the first strin of the TITLE
document.addEventListener('DOMContentLoaded', () => {
  const firstSpanTitle = document.querySelector('.title-span-1');
  const spanScrollThreshold = 112; // = 7rem

  window.addEventListener('scroll', () => {
    if (window.scrollY > spanScrollThreshold) {
      firstSpanTitle.classList.add('span-title-color');
    } else {
      firstSpanTitle.classList.remove('span-title-color');
    }
  });
});

// Open / Close the Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const openMenuButton = document.getElementById('openMenu');
  const closeMenuButton = document.getElementById('closeMenu');

  // Open Menu
  openMenuButton.addEventListener('click', (event) => {
    navLinks.classList.add('nav-links-visible');
  });

  // Close Menu
  closeMenuButton.addEventListener('click', (event) => {
    navLinks.classList.remove('nav-links-visible');
  });

  if (window.width > 1360) {
    navLinks.style.display = 'none';
  }
});

// Accordion control
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.faq-accordion details');

  accordions.forEach((accordion) => {
    accordion.addEventListener('toggle', () => {
      // Close other open details
      if (accordion.open) {
        accordions.forEach((item) => {
          if (item !== accordion) {
            item.removeAttribute('open');
          }
        });
      }

      // Update aria-expanded dynamically
      const summary = accordion.querySelector('summary');
      summary.setAttribute('aria-expanded', accordion.open);
    });
  });
});
