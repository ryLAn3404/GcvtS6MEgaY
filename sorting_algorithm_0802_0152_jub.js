// 代码生成时间: 2025-08-02 01:52:58
// Import D3.js
const d3 = require('d3');

// Helper function to create the SVG element
function createSvg(width, height) {
    return d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);
}

// Helper function to generate an array of random numbers
function generateRandomArray(size, min, max) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

// Helper function to display the array on the SVG
function displayArray(arr, svg) {
    const barWidth = 20;
    const barHeight = svg.attr('height') / arr.length;
    const x = d3.scaleLinear()
        .domain([0, d3.max(arr)])
        .range([0, svg.attr('width')]);

    svg.selectAll('rect')
        .data(arr)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * (barWidth + 5))
        .attr('y', d => svg.attr('height') - d * barHeight)
        .attr('width', barWidth)
        .attr('height', d => d * barHeight)
        .attr('fill', 'steelblue');
}

// Bubble Sort Algorithm
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Main function to visualize the sorting process
function visualizeSorting(algorithm, arr) {
    const svg = createSvg(500, 300);
    displayArray(arr, svg);

    const steps = algorithm(arr.slice());
    let index = 0;

    function step() {
        if (index < steps.length) {
            const current = steps[index];
            displayArray(current, svg);
            index++;
            setTimeout(step, 100); // Pause between steps for visualization
        } else {
            svg.selectAll('rect')
                .transition()
                .duration(1000)
                .attr('fill', 'green'); // Change color to green once sorted
        }
    }

    step();
}

// Example usage
const array = generateRandomArray(20, 1, 100);
console.log('Original array:', array);
visualizeSorting(bubbleSort, array);
