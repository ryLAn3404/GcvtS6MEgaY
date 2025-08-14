// 代码生成时间: 2025-08-15 04:22:24
 * This module provides a utility to format API responses into a more readable and structured format.
 *
 * @version 1.0
 * @author Your Name
 */

/**
 * Function to format API response
 * @param {Object} response - The raw API response object
 * @param {Object} config - Configuration for formatting
 * @returns {Object} The formatted API response
 */
function formatApiResponse(response, config) {
  // Check if the response is valid and has the expected structure
  if (!response || typeof response !== 'object' || !response.data) {
    throw new Error('Invalid API response format.');
  }

  // Check if the configuration is valid and has the required properties
  if (!config || typeof config !== 'object' || !config.keys) {
    throw new Error('Invalid configuration for API response formatting.');
  }

  // Initialize the formatted response object
  let formattedResponse = {};

  // Loop through the keys in the configuration and format the response accordingly
  config.keys.forEach(key => {
    // Check if the key exists in the response data
    if (response.data.hasOwnProperty(key)) {
      // Add the key-value pair to the formatted response
      formattedResponse[key] = response.data[key];
    } else {
      // Handle missing keys in the response data
      console.warn(`Key '${key}' not found in API response data. It will be omitted from the formatted response.`);
    }
  });

  // Return the formatted response
  return formattedResponse;
}

/**
 * Example usage of the API response formatter
 */
// Mock API response data
const apiResponse = {
  data: {
    id: 123,
    name: 'John Doe',
    email: 'john.doe@example.com'
  }
};

// Configuration for formatting the API response
const formatConfig = {
  keys: ['name', 'email']
};

// Format the API response
try {
  const formattedData = formatApiResponse(apiResponse, formatConfig);
  console.log('Formatted API Response:', formattedData);
} catch (error) {
  console.error('Error formatting API response:', error.message);
}
