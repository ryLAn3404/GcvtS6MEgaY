// 代码生成时间: 2025-08-14 00:51:45
 * This tool calculates hash values for input strings using various hashing algorithms.
 * 
 * @author Your Name
 * @version 1.0.0
 */
const d3 = require('d3');

// Function to calculate hash using different algorithms
function calculateHash(input, algorithm) {
    // Error handling for unsupported algorithms
    if (!algorithms[algorithm]) {
        throw new Error('Unsupported hashing algorithm');
    }

    // Calculate hash using the specified algorithm
    return algorithms[algorithm](input);
}

// Supported hashing algorithms
const algorithms = {
    'md5': function(input) {
        return crypto.createHash('md5').update(input).digest('hex');
    },
    'sha1': function(input) {
        return crypto.createHash('sha1').update(input).digest('hex');
    },
    'sha256': function(input) {
        return crypto.createHash('sha256').update(input).digest('hex');
    }
};

// D3.js visualization
function setupVisualization() {
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select('body').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Add elements to the SVG here
    // ...

    return svg;
}

// Example usage
const inputString = 'Hello World';
const hashAlgorithm = 'sha256';

try {
    const hashValue = calculateHash(inputString, hashAlgorithm);
    console.log('Hash Value:', hashValue);
} catch (error) {
    console.error(error.message);
}

// Visualize the hash value
const svg = setupVisualization();
// Add visualization code here
// ...