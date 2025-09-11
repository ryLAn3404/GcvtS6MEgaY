// 代码生成时间: 2025-09-11 15:07:43
// Import necessary modules
const fs = require('fs');
const path = require('path');

// Function to rename a single file
function renameFile(originalPath, newPath) {
  try {
    fs.renameSync(originalPath, newPath);
    console.log(`Renamed '${originalPath}' to '${newPath}'`);
  } catch (error) {
    console.error(`Error renaming file: ${error}`);
  }
}

// Function to get file names in a directory
function getFilesInDirectory(directoryPath) {
  try {
    return fs.readdirSync(directoryPath);
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
}

// Main function to process batch renaming
function batchRename(directoryPath, renamePattern) {
  try {
    // Get all files in the specified directory
    const files = getFilesInDirectory(directoryPath);
    
    // Process each file for renaming
    files.forEach((file, index) => {
      const originalPath = path.join(directoryPath, file);
      // Apply the rename pattern to the file name
      const newFileName = renamePattern(file, index);
      const newPath = path.join(directoryPath, newFileName);
      
      // Rename the file
      renameFile(originalPath, newPath);
    });
  } catch (error) {
    console.error(`Error processing batch rename: ${error}`);
  }
}

// Usage example:
// batchRename('/path/to/directory', (filename, index) => {
//   const nameParts = filename.split('.');
//   const ext = nameParts.pop();
//   return `${nameParts.join('.')}-${index + 1}.${ext}`;
// });

module.exports = {
  renameFile,
  getFilesInDirectory,
  batchRename
};