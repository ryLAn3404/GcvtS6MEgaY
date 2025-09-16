// 代码生成时间: 2025-09-17 02:58:45
const fs = require('fs');
const d3 = require('d3-dsv');

/**
 * Reads a CSV file asynchronously.
 * @param {string} filePath - The path to the CSV file.
 * @return {Promise<Array<Object>>} - A promise that resolves to an array of objects.
 */
function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    d3.csv(filePath).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    });
  });
}

/**
 * Processes each row of the CSV data.
 * @param {Array<Object>} data - The CSV data as an array of objects.
 * @param {Function} processor - A function that processes each row.
 * @return {Promise<Array<Object>>} - A promise that resolves to the processed data.
 */
function processCSVData(data, processor) {
  return data.map(row => {
    return processor(row);
  });
}

/**
 * Writes processed data to a new CSV file.
 * @param {Array<Object>} data - The processed data as an array of objects.
 * @param {string} outputPath - The path to the output CSV file.
 * @return {Promise<void>} - A promise that resolves when the file is written.
 */
function writeCSVFile(data, outputPath) {
  return new Promise((resolve, reject) => {
    const csvString = d3.csvFormat(data);
    fs.writeFile(outputPath, csvString, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Processes multiple CSV files in a directory.
 * @param {string} directoryPath - The path to the directory containing CSV files.
 * @param {Function} processor - A function that processes each row.
 * @return {Promise<void>} - A promise that resolves when all files are processed.
 */
function processMultipleCSVFiles(directoryPath, processor) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (error, files) => {
      if (error) {
        reject(error);
        return;
      }

      let processedFilesCount = 0;
      files.forEach(file => {
        if (file.isFile() && file.name.endsWith('.csv')) {
          const filePath = `${directoryPath}/${file.name}`;
          readCSVFile(filePath)
            .then(data => processCSVData(data, processor))
            .then(processedData => writeCSVFile(processedData, `${directoryPath}/${file.name.replace('.csv', '_processed.csv')}`))
            .then(() => processedFilesCount++)
            .catch(error => reject(error));
        }
      });

      const interval = setInterval(() => {
        if (processedFilesCount === files.length) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  });
}

// Example usage:
// processMultipleCSVFiles('./csv_files', row => {
//   // Perform some processing on each row
//   return row;
// });