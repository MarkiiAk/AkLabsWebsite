// Get elements
const modal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");
const youtubePlayer = document.getElementById("youtubePlayer");
const playIcon = document.getElementById("play-icon");
const imgBlog = document.getElementById("img-blog");

// Function to open modal with YouTube video
function openModal(videoUrl) {
  modal.style.display = "flex"; // Display modal
  youtubePlayer.src = ""; // Clear the src first to reset
  setTimeout(() => {
    youtubePlayer.src = videoUrl; // Set YouTube video URL after clearing
  }, 100); // Small delay to ensure reset
}

// Close modal when clicking the close button
closeModal.onclick = function () {
  modal.style.display = "none";
  youtubePlayer.src = ""; // Stop video playback by clearing the src
};

// Close modal if clicked outside the modal content
modal.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none"; // Close the modal
    youtubePlayer.src = ""; // Stop video playback
  }
};

// Add event listeners to open modal with YouTube link
playIcon.onclick = () =>
  openModal("https://www.youtube.com/embed/YOUR_VIDEO_ID");
imgBlog.onclick = () =>
  openModal("https://www.youtube.com/embed/YOUR_VIDEO_ID");
