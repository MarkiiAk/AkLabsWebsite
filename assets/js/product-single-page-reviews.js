// Select all stars
const stars = document.querySelectorAll(".stars__star");

// Add hover functionality
stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    const hoverValue = parseInt(star.getAttribute("data-value"), 10);

    // Highlight hovered star and all preceding stars
    stars.forEach((el) => {
      const value = parseInt(el.getAttribute("data-value"), 10);
      if (value <= hoverValue) {
        el.classList.add("hovered");
      } else {
        el.classList.remove("hovered");
      }
    });
  });

  // Remove hover effects on mouseout
  star.addEventListener("mouseout", () => {
    stars.forEach((el) => el.classList.remove("hovered"));
  });

  // Add click functionality to make stars active
  star.addEventListener("click", () => {
    const clickValue = parseInt(star.getAttribute("data-value"), 10);

    // Set active stars up to the clicked star
    stars.forEach((el) => {
      const value = parseInt(el.getAttribute("data-value"), 10);
      if (value <= clickValue) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  });
});

// Click outside to reset active stars
document.addEventListener("click", (event) => {
  const starsContainer = document.querySelector(".stars");
  if (!starsContainer.contains(event.target)) {
    stars.forEach((star) => {
      star.classList.remove("active");
    });
  }
});
