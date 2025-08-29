const swiper = new Swiper(".hero-slider-container", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000, // Change delay to your desired time in milliseconds (5000ms = 5 seconds)
    disableOnInteraction: false, // Keep autoplay running even after user interaction
  },
});
