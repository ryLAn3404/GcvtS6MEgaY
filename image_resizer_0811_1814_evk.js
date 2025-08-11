// 代码生成时间: 2025-08-11 18:14:24
// Import D3.js
const d3 = require('d3');

class ImageResizer {
  constructor(inputDirectory, outputDirectory, targetSize) {
    // Initialize with the input directory, output directory, and target image size
    this.inputDirectory = inputDirectory;
    this.outputDirectory = outputDirectory;
    this.targetSize = targetSize;
  }

  // Function to resize an image
  resizeImage(inputFilePath, outputFilePath, size) {
    return new Promise((resolve, reject) => {
      // Read the image file
      const image = new Image();
      image.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;

        // Resize the image and draw it on the canvas
        const aspect = image.width / image.height < size / size ? size : size * (image.height / image.width);
        const x = (size - aspect) / 2;
        const y = (size - aspect) / 2;
        ctx.drawImage(image, x, y, aspect, aspect);

        // Convert the canvas to a data URL and resolve the promise
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to resize image'));
          }
        }, 'image/jpeg');
      };
      image.onerror = reject;
      image.src = inputFilePath;
    });
  }

  // Function to process all images in the directory
  processDirectory() {
    d3.fs.readFile(this.inputDirectory, {
      recursive: true,
      filter: (file) => file.extname === '.jpg' || file.extname === '.png'
    }, (error, files) => {
      if (error) {
        console.error('Error reading directory:', error);
        return;
      }

      files.forEach(file => {
        const outputPath = `${this.outputDirectory}/${file.name}${file.extname}`;
        this.resizeImage(file.path, outputPath, this.targetSize)
          .then(blob => console.log('Resized image saved:', outputPath))
          .catch(error => console.error('Error resizing image:', error));
      });
    });
  }
}

// Example usage
const resizer = new ImageResizer('./input/images', './output/images', 500);
resizer.processDirectory();