// 代码生成时间: 2025-09-10 03:09:23
 * It provides a simple interface to create random data sets.
 */

// Importing D3.js
const d3 = require('d3');

/**
 * Generates a random number between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random number between min and max.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random string of a given length.
 * @param {number} length - The length of the string to generate.
 * @returns {string} A random string of the specified length.
 */
function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(getRandomNumber(0, characters.length - 1));
  }
  return result;
}

/**
 * Generates a random date within a specified range.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {Date} A random date between startDate and endDate.
 */
function getRandomDate(startDate, endDate) {
  const dateRange = endDate - startDate;
  const randomMs = Math.random() * dateRange;
  return new Date(startDate.getTime() + randomMs);
}

/**
 * Creates a test data set with the specified number of entries.
 * @param {number} numberOfEntries - The number of data entries to generate.
 * @returns {Array} An array of objects representing the test data.
 */
function generateTestData(numberOfEntries) {
  if (!Number.isInteger(numberOfEntries) || numberOfEntries <= 0) {
    throw new Error('The number of entries must be a positive integer.');
  }

  const testData = [];
  const startDate = new Date(2020, 0, 1); // January 1st, 2020
  const endDate = new Date(2023, 11, 31); // December 31st, 2023

  for (let i = 0; i < numberOfEntries; i++) {
    testData.push({
      id: i + 1, // Unique identifier for each entry
      name: getRandomString(10), // Random string for name
      value: getRandomNumber(100, 1000), // Random value between 100 and 1000
      date: getRandomDate(startDate, endDate) // Random date within the specified range
    });
  }

  return testData;
}

// Example usage:
try {
  const data = generateTestData(10);
  console.log(data);
} catch (error) {
  console.error(error.message);
}