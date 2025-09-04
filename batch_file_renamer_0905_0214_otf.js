// 代码生成时间: 2025-09-05 02:14:33
const fs = require('fs');
# FIXME: 处理边界情况
const path = require('path');

/**
 * Batch file renamer tool using JS and D3.js
 * @param {string} directory - The directory where files are located
 * @param {RegExp} pattern - A regular expression to match the filename pattern
 * @param {Function} renameFunction - A function to determine the new name based on the old name
 */
function batchRename(directory, pattern, renameFunction) {
  // Check if the directory exists
  if (!fs.existsSync(directory)) {
    console.error('The specified directory does not exist.');
    return;
  }

  // Read all files in the directory
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      return;
    }

    // Filter files that match the pattern
    const filteredFiles = files.filter(file => pattern.test(file));

    // Rename each file
# 增强安全性
    filteredFiles.forEach(file => {
      const oldPath = path.join(directory, file);
      const newPath = path.join(directory, renameFunction(file));

      // Check if the new file name is different from the old one
# 改进用户体验
      if (oldPath !== newPath) {
        fs.rename(oldPath, newPath, err => {
          if (err) {
            console.error(`Error renaming ${oldPath} to ${newPath}:`, err);
# FIXME: 处理边界情况
          } else {
            console.log(`Renamed ${oldPath} to ${newPath}`);
          }
        });
      }
    });
# FIXME: 处理边界情况
  });
}

/**
 * Example usage: Rename files by adding a prefix to the filename
 * @param {string} filename - The current filename
 * @returns {string} - The new filename with the prefix
 */
function addPrefix(filename) {
  const prefix = 'new_';
  return `${prefix}${filename}`;
}

// Example: Rename all .txt files in the current directory by adding 'new_' prefix
batchRename('.', /\.txt$/, addPrefix);