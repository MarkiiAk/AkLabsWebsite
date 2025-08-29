function animateCountUp(target, duration) {
  const countElement = document.getElementById("count");
  let start = 0;
  const end = target;
  const increment = end / (duration / 16); // Frame rate: ~60 frames per second
  let current = start;

  function updateCount() {
    current += increment;
    if (current >= end) {
      countElement.innerText = `${Math.floor(end)}+`; // Display the target number when complete
    } else {
      countElement.innerText = `${Math.floor(current)}+`; // Update count during animation
      requestAnimationFrame(updateCount); // Smooth animation using requestAnimationFrame
    }
  }

  updateCount(); // Start the counting
}

// Set up Intersection Observer to detect when the section is visible
const counterSection = document.querySelector(".counter_wrapper");
let observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When the section comes into view, restart the count
        animateCountUp(40, 3000);
      } else {
        // Reset the count when the section goes out of view (optional)
        document.getElementById("count").innerText = "0+"; // Reset the counter text
      }
    });
  },
  { threshold: 0.5 }
); // Start when 50% of the element is visible

// Observe the section
observer.observe(counterSection);
