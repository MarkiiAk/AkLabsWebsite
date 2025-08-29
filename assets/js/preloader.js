document.addEventListener("DOMContentLoaded", () => {
  // Disable scrolling
  document.body.style.overflow = "hidden";

  // Show the loader for 4 seconds, then hide it and enable scrolling
  setTimeout(() => {
    const loader = document.querySelector(".preloader");
    if (loader) loader.style.display = "none"; // Hide the loader

    // Enable scrolling
    document.body.style.overflow = "";
  }, 4000); // 4 seconds
});
