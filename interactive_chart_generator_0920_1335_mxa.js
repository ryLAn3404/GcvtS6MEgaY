// 代码生成时间: 2025-09-20 13:35:21
 * interactive_chart_generator.js
 * A program that generates interactive charts using the D3 framework.
 *
 * @author Your Name
 * @version 1.0
 */

// Importing D3.js library
const d3 = require('d3');

// Function to generate an interactive chart
function generateChart(selector, data, options) {
  // Error handling
  if (typeof selector !== 'string' || !data || typeof options !== 'object') {
    throw new Error('Invalid arguments provided to generateChart function.');
  }
  
  // Check if selector is valid and exists in the DOM
  const svgContainer = d3.select(selector);
  if (svgContainer.empty()) {
    throw new Error(`Selector '${selector}' does not exist in the DOM.`);
  }
  
  // Set up the SVG container
  const width = options.width || 800;
  const height = options.height || 600;
  svgContainer.selectAll('svg').remove();
  const svg = svgContainer.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Define the X and Y scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d[options.xKey]))
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d[options.yKey]))
    .range([height, 0]);
  
  // Define the axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  
  // Append axes to the SVG
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);
  
  svg.append('g')
    .call(yAxis);
  
  // Draw the data points
  svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', d => xScale(d[options.xKey]))
    .attr('cy', d => yScale(d[options.yKey]))
    .attr('r', options.radius || 5)
    .style('fill', options.color || 'steelblue')
    .on('mouseover', (event, d) => {
      // Handle mouseover event
      d3.select(this).style('fill', 'red');
    })
    .on('mouseout', (event, d) => {
      // Handle mouseout event
      d3.select(this).style('fill', options.color || 'steelblue');
    });
}

// Example usage
// Assuming you have a data array and a valid HTML element with the id 'chart-container'
const chartData = [{
  "x": 1,
  "y": 10,
  "label": "Point 1"
}, {
  "x": 2,
  "y": 20,
  "label": "Point 2"
}];

generateChart('#chart-container', chartData, {
  xKey: 'x',
  yKey: 'y',
  width: 600,
  height: 400,
  radius: 3,
  color: 'blue'
});
