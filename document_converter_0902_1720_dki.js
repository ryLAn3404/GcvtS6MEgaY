// 代码生成时间: 2025-09-02 17:20:05
const d3 = require('d3');

/**
 * Document Converter
 * Converts document formats using D3.js
 *
 * @param {string} source - The source document as a string
 * @param {string} targetFormat - The target format to convert to (e.g., 'html', 'json')
 * @returns {Promise<string>} The converted document as a string
 */
function convertDocument(source, targetFormat) {
  // Check if the source is a string
  if (typeof source !== 'string') {
    throw new Error('Source must be a string.');
  }

  // Check if the target format is valid
  const validFormats = ['html', 'json'];
  if (!validFormats.includes(targetFormat)) {
    throw new Error(`Target format must be one of: ${validFormats.join(', ')}`);
  }

  // Convert the document based on the target format
  return new Promise((resolve, reject) => {
    switch (targetFormat) {
      case 'html':
        // Use D3.js to parse the source as HTML
        d3.parse(source)
          .then(html => resolve(html))
          .catch(error => reject(error));
        break;
      case 'json':
        // Attempt to parse the source as JSON
        try {
          const json = JSON.parse(source);
          resolve(JSON.stringify(json, null, 2));
        } catch (error) {
          reject(error);
        }
        break;
      default:
        // Fallback for unsupported formats
        reject(new Error('Unsupported target format'));
    }
  });
}

// Example usage:
convertDocument('<p>Hello World</p>', 'html')
  .then(html => console.log(html))
  .catch(error => console.error('Conversion error:', error));
