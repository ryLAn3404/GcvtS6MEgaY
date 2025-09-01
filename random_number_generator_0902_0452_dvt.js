// 代码生成时间: 2025-09-02 04:52:01
 * It includes error handling and follows best practices for code readability, maintenance, and scalability.
 */

// Importing necessary D3 modules
const { randomUniform } = require('d3-random');

/**
 * Generates a random number between min and max (inclusive).
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random number within the specified range.
 */
function generateRandomNumber(min, max) {
  // Validate input
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both min and max must be numbers.');
  }
  if (min > max) {
    throw new Error('Min must be less than or equal to max.');
  }

  // Generate and return the random number
  return randomUniform(min, max)();
}

// Example usage
try {
  const randomNumber = generateRandomNumber(1, 100);
  console.log(`Random Number: ${randomNumber}`);
} catch (error) {
  console.error('Error:', error.message);
}