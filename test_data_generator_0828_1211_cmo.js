// 代码生成时间: 2025-08-28 12:11:19
const d3 = require('d3');

/**
 * Generates a specified number of test data points.
 * @param {number} numDataPoints - The number of data points to generate.
 * @returns {Array} - An array of test data points.
 */
function generateTestData(numDataPoints) {
  // Check if the number of data points is a positive integer
  if (!Number.isInteger(numDataPoints) || numDataPoints <= 0) {
    throw new Error('The number of data points must be a positive integer.');
  }

  // Generate test data points using d3.js
  const testData = d3.range(numDataPoints).map((d, i) => ({
    id: i,
    value: d3.randomUniform(0, 100)(),
    label: `Data Point ${i + 1}`
  }));

  return testData;
}

/**
 * Exports the generateTestData function for use in other modules.
 */
module.exports = { generateTestData };
