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
