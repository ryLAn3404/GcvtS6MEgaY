// 代码生成时间: 2025-08-30 17:14:09
// Import the D3.js library
const d3 = require('d3');

// Configuration for image resizing
const config = {
  targetWidth: 800, // Target width for resized images
  targetHeight: 600 // Target height for resized images
};

// Function to resize an image
function resizeImage(imageElement, width, height) {
  // Check if the imageElement is valid
  if (!imageElement) {
    console.error('Invalid image element');
    return;
  }

  // Set new dimensions
  imageElement.style.width = `${width}px`;
  imageElement.style.height = `${height}px`;
}

// Function to batch resize images within a container
function batchResizeImages(containerSelector, newWidth, newHeight) {
  // Select the container using D3
  const container = d3.select(containerSelector);

  // Check if the container is valid
  if (container.empty()) {
    console.error('Invalid container selector');
    return;
  }

  // Select all image elements within the container
  const images = container.selectAll('img');

  // Resize each image
  images.each(function() {
    resizeImage(this, newWidth, newHeight);
  });
}

// Expose the batchResizeImages function to the global scope for easy access
module.exports = batchResizeImages;

// Example usage:
// batchResizeImages('#image-container', 800, 600); // Adjust the images in the container with id 'image-container' to 800x600