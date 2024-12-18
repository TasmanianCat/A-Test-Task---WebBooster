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

// Carousel
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

  const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
  const itemCount = carouselItems.length;
  const itemWidth = carouselItems[0].offsetWidth + 17; // Item width + gap
  let currentIndex = 0;
  let isTransitioning = false;

  console.log(carousel.clientHeight + 'px: This is hieght of the carousel');
  console.log(carousel.clientWidth + 'px: This is width of the carousel');
  console.log(itemCount + ' units: This is number of carousel items');
  console.log(itemWidth + 'px: This is width of the carousel item');

  // 1. Clone first and last items for seamless looping
  const firstClone = carouselItems[0].cloneNode(true);
  const secondClone = carouselItems[1].cloneNode(true);
  const thirdClone = carouselItems[2].cloneNode(true);
  const fourthClone = carouselItems[3].cloneNode(true);
  const fifthClone = carouselItems[4].cloneNode(true);
  const lastClone = carouselItems[itemCount - 1].cloneNode(true);

  carousel.appendChild(firstClone); // Clone of first item at the end
  carousel.appendChild(secondClone); // Clone of second item at the end
  carousel.appendChild(thirdClone); // Clone of third item at the end
  carousel.appendChild(fourthClone); // Clone of fourth item at the end
  carousel.appendChild(fifthClone); // Clone of fifth item at the end
  carousel.insertBefore(lastClone, carouselItems[0]); // Clone of last at the beginning

  // 2. Update the carousel position to start at the first real item
  const totalItems = itemCount + 1; // Clones included
  carousel.style.transform = `translateX(-${itemWidth}px)`; // Start position

  // 3. Move Carousel to Next or Previous
  const moveToIndex = (index) => {
    if (isTransitioning) return; // Prevent double clicks during transition
    isTransitioning = true;

    currentIndex = index;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${
      itemWidth * (currentIndex + 1)
    }px)`;
  };

  // 4. Handle transitionend for looping
  carousel.addEventListener('transitionend', () => {
    if (currentIndex === totalItems - 1) {
      // If moved to the cloned first item, jump to the real first item
      currentIndex = 0;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-${itemWidth}px)`;
    }

    if (currentIndex === -1) {
      // If moved to the cloned last item, jump to the real last item
      currentIndex = itemCount - 1;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-${
        itemWidth * (currentIndex + 1)
      }px)`;
    }

    isTransitioning = false;
  });

  // 5. Button Event Listeners
  nextButton.addEventListener('click', () => moveToIndex(currentIndex + 1));
  prevButton.addEventListener('click', () => moveToIndex(currentIndex - 1));

  // 6. Auto-Scroll Logic
  let autoScroll = setInterval(() => moveToIndex(currentIndex + 1), 3000);

  // Pause Auto-Scroll on Hover
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () =>
    clearInterval(autoScroll)
  );
  carouselContainer.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => moveToIndex(currentIndex + 1), 3000);
  });

  // Initialize swipe variables
  let startX = 0;
  let endX = 0;
  const threshold = 50; // Minimum swipe distance to register as a swipe

  // 7. Swipe Events for Mobile
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', () => {
    const swipeDistance = endX - startX;

    if (Math.abs(swipeDistance) > threshold) {
      if (swipeDistance > 0) {
        // Swipe Right (Previous Item)
        moveToIndex(currentIndex - 1);
      } else {
        // Swipe Left (Next Item)
        moveToIndex(currentIndex + 1);
      }
    }
  });
});
