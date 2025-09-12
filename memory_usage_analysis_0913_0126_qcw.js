// 代码生成时间: 2025-09-13 01:26:39
 * Data format:
 * { 'memory': { 'used': 1234, 'total': 5678 } }
 */

// Required modules
const d3 = require('d3');

// Function to create the memory usage chart
function createMemoryUsageChart(data, selector) {
    // Error handling
    if (!data || !data.memory || typeof data.memory.used !== 'number' || typeof data.memory.total !== 'number') {
        throw new Error('Invalid data format for memory usage chart');
    }

    // Constants for SVG dimensions
    const width = 600;
    const height = 400;

    // Create an SVG element
    const svg = d3.select(selector).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Calculate the radius of the pie chart
    const radius = Math.min(width, height) / 2;

    // Create a pie generator
    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    // Create an arc generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Data preparation
    const memoryData = [
        { label: 'Used', value: data.memory.used },
        { label: 'Free', value: data.memory.total - data.memory.used }
    ];

    // Create the pie chart
    const paths = svg.selectAll('path')
        .data(pie(memoryData))
        .enter().append('path')
        .attr('d', arc)
        .style('fill', d => d.data.label === 'Used' ? '#d62728' : '#1f77b4');

    // Add labels
    svg.selectAll('text')
        .data(pie(memoryData))
        .enter().append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .text(d => `${(d.data.value / data.memory.total * 100).toFixed(2)}%`);
}

// Example usage
// createMemoryUsageChart({ memory: { used: 2000, total: 8000 } }, '#chart');