// Function to handle dropdown click and keep only one active at a time
function handleDropdownClick(dropdown) {
  const content = dropdown.querySelector(".dropdown_content");
  const allDropdowns = document.querySelectorAll(".dropdown");

  // Toggle the clicked dropdown and close others
  if (dropdown.classList.contains("active")) {
    dropdown.classList.remove("active");
    content.style.maxHeight = null; // Close current dropdown smoothly
  } else {
    allDropdowns.forEach((d) => {
      d.classList.remove("active");
      const dContent = d.querySelector(".dropdown_content");
      dContent.style.maxHeight = null; // Collapse others
    });
    dropdown.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px"; // Smooth expand
  }
}

// Attach click event listeners
document.addEventListener("DOMContentLoaded", () => {
  const dropdownWrappers = document.querySelectorAll(".dropdown-wrapper");

  // Set the first dropdown as active by default
  const firstDropdown = document.querySelector(".dropdown");
  if (firstDropdown) {
    firstDropdown.classList.add("active");
    const firstContent = firstDropdown.querySelector(".dropdown_content");
    firstContent.style.maxHeight = firstContent.scrollHeight + "px"; // Expand first dropdown
  }

  // Attach click event to each dropdown for toggling
  dropdownWrappers.forEach((dropdownWrapper) => {
    const dropdowns = dropdownWrapper.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent inner elements from re-triggering
        handleDropdownClick(dropdown);
      });
    });
  });
});
