// 代码生成时间: 2025-09-19 23:26:23
 * the principles of maintainability and extensibility.
 */

(function() {

  // Define the API Response Formatter constructor
  function ApiResponseFormatter() {
    this.formatters = [];
  }

  /**
   * Add a formatter function to the stack.
   * @param {function} formatter - A function that takes the response and returns a formatted response.
   * @returns {ApiResponseFormatter} - The instance for chaining.
   */
  ApiResponseFormatter.prototype.addFormatter = function(formatter) {
    this.formatters.push(formatter);
    return this;
  };

  /**
   * Apply all formatters to the response data.
   * @param {object} response - The raw API response data.
   * @returns {object} - The formatted response data.
   */
  ApiResponseFormatter.prototype.format = function(response) {
    // Check if response is an object
    if (typeof response !== 'object' || response === null) {
      throw new Error('Invalid response: Expected an object.');
    }
    
    // Apply each formatter in sequence
    return this.formatters.reduce(function(acc, cur) {
      return cur(acc);
    }, response);
  };

  // Expose the ApiResponseFormatter to the global scope
  window.ApiResponseFormatter = ApiResponseFormatter;

})();

// Example usage:

// Define a simple formatter function
function uppercaseFormatter(response) {
  return {
    ...response,
    message: response.message ? response.message.toUpperCase() : null
  };
}

// Create an instance of ApiResponseFormatter
const formatter = new ApiResponseFormatter();

// Add formatters
formatter.addFormatter(uppercaseFormatter)
  // .addOtherFormatters(...); // Add more formatters if needed
  ;

// Format an API response
try {
  const formattedResponse = formatter.format({ message: 'success' });
  console.log(formattedResponse);
} catch (error) {
  console.error(error.message);
}
