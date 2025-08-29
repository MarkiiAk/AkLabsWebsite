// Get the gallery modal and image elements
var galleryModal = document.getElementById("gallery_image_modal");
var galleryModalImg = document.getElementById("gallery_modal_img");
var currentIndex = 0; // Track the current image index

// Get all gallery items (images)
var galleryItems = document.querySelectorAll(".gallery_item img");
var totalImages = galleryItems.length; // Get the total number of images

// Get navigation buttons
var galleryPrev = document.querySelector(".gallery-prev");
var galleryNext = document.querySelector(".gallery-next");
var thumbnailContainer = document.querySelector(".gallery_thumbnails");
var thumbnailPrev = document.querySelector(".thumbnail-prev");
var thumbnailNext = document.querySelector(".thumbnail-next");

// Thumbnails per set (display 1 at a time)
const thumbnailsPerSet = 1; // Change to display one thumbnail at a time
var currentThumbnailIndex = 0; // Index of the first thumbnail being shown

// Function to update the modal image based on index
function showImage(index) {
  if (index >= 0 && index < totalImages) {
    galleryModalImg.src = galleryItems[index].src; // Set the modal image to the corresponding gallery image
    currentIndex = index; // Update the current index
    currentThumbnailIndex = index; // Update the current thumbnail index
    updateActiveThumbnail(index); // Highlight the active thumbnail
  }
}

// Add thumbnails to the modal slider
galleryItems.forEach(function (item, index) {
  var thumbnail = document.createElement("img");
  thumbnail.src = item.src;
  thumbnail.dataset.index = index;
  thumbnail.onclick = function () {
    showImage(index); // Show clicked image in modal
  };
  thumbnailContainer.appendChild(thumbnail);
});

// Function to highlight the active thumbnail
function updateActiveThumbnail(index) {
  var thumbnails = document.querySelectorAll(".gallery_thumbnails img");
  thumbnails.forEach(function (thumb, i) {
    thumb.classList.remove("active");
    if (i === index) {
      thumb.classList.add("active");
    }
  });
}

// Add click event to all gallery fullscreen icons
galleryItems.forEach(function (item, index) {
  var icon = item.nextElementSibling; // Get the corresponding fullscreen icon
  icon.addEventListener("click", function () {
    galleryModal.style.display = "block";
    showImage(index); // Show the clicked image in the modal
  });
});

// Close the gallery modal
var galleryClose = document.getElementsByClassName("gallery-close")[0];
galleryClose.onclick = function () {
  galleryModal.style.display = "none";
};

// // Close the gallery modal when clicking outside the image
// galleryModal.addEventListener("click", function (event) {
//   // Check if the clicked element is the modal wrapper
//   if (event.target === galleryModal) {
//     galleryModal.style.display = "none"; // Close the modal
//   }
// });

galleryModal.addEventListener("click", function (event) {
  if (
    event.target !== galleryModalImg && // Not clicking on the modal image
    !galleryPrev.contains(event.target) && // Not clicking on the previous button
    !galleryNext.contains(event.target) && // Not clicking on the next button
    !thumbnailPrev.contains(event.target) && // Not clicking on the thumbnail-prev button
    !thumbnailNext.contains(event.target) // Not clicking on the thumbnail-next button
  ) {
    galleryModal.style.display = "none";
  }
});

// Navigate to the previous image
galleryPrev.onclick = function () {
  var newIndex = currentIndex - 1;
  if (newIndex < 0) {
    newIndex = totalImages - 1; // Loop back to the last image if at the first
  }
  showImage(newIndex);
};

// Navigate to the next image
galleryNext.onclick = function () {
  var newIndex = currentIndex + 1;
  if (newIndex >= totalImages) {
    newIndex = 0; // Loop back to the first image if at the last
  }
  showImage(newIndex);
};

// Navigate thumbnails (scroll left in single steps)
thumbnailPrev.onclick = function () {
  currentThumbnailIndex -= thumbnailsPerSet; // Change to 1
  if (currentThumbnailIndex < 0) {
    currentThumbnailIndex = 0;
  }
  updateThumbnailSlider();
};

// Navigate thumbnails (scroll right in single steps)
thumbnailNext.onclick = function () {
  currentThumbnailIndex += thumbnailsPerSet; // Change to 1
  if (currentThumbnailIndex >= totalImages) {
    currentThumbnailIndex = totalImages - 1; // Prevent going out of bounds
  }
  updateThumbnailSlider();
};

// Function to scroll the thumbnail slider based on the current index
function updateThumbnailSlider() {
  var scrollAmount = currentThumbnailIndex * (50 + 0); // 80px width + 10px margin for each thumbnail
  thumbnailContainer.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });

  // Update the displayed image based on the current thumbnail index
  showImage(currentThumbnailIndex);

  updateThumbnailNavigation();
}

// Disable/enable thumbnail prev/next buttons based on scroll position
function updateThumbnailNavigation() {
  var maxIndex = totalImages - 1; // Change to totalImages - 1 for single items

  // Disable prev button if at the start
  if (currentThumbnailIndex <= 0) {
    thumbnailPrev.classList.add("disabled");
  } else {
    thumbnailPrev.classList.remove("disabled");
  }

  // Disable next button if at the end
  if (currentThumbnailIndex >= maxIndex) {
    thumbnailNext.classList.add("disabled");
  } else {
    thumbnailNext.classList.remove("disabled");
  }
}

// Update navigation visibility when modal opens
window.addEventListener("load", updateThumbnailNavigation);
galleryItems.forEach(function (item, index) {
  var icon = item.nextElementSibling;
  icon.addEventListener("click", updateThumbnailNavigation);
});
