// 代码生成时间: 2025-09-16 22:17:11
// Define the width and height of the visualization area

const width = 600;

const height = 300;


// Define the padding between bars and at the edges

const padding = 5;


// Define the scale for the bar heights

const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - padding * 2, padding]);


/**
 * Function to generate a random array of numbers
 * @param {number} length - The length of the array
 * @returns {number[]} An array of random numbers
 */

function generateRandomArray(length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 100) + 1); // Random numbers between 1 and 100
    }
    return array;
}


/**
 * Function to create the initial bar chart
 * @param {number[]} data - The data to be visualized
 */

function createBarChart(data) {
    const svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * (width / data.length) + padding)
        .attr("y", d => yScale(d))
        .attr("width", width / data.length - padding * 2)
        .attr("height", d => height - yScale(d))
        .attr("fill", "steelblue\);
}


/**
 * Function to sort the array using a chosen sorting algorithm and update the visualization
 * @param {number[]} array - The array to sort
 * @param {string} algorithm - The name of the sorting algorithm to use
 */

function sortArray(array, algorithm) {
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort(array);
            break;
        case 'selectionSort':
            selectionSort(array);
            break;
        // Additional cases for other sorting algorithms can be added here
        default:
            console.error('Sorting algorithm not recognized.');
    }
    updateBarChart(array);
}


/**
 * Bubble Sort Algorithm
 * @param {number[]} array - The array to sort
 */

function bubbleSort(array) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
}


/**
 * Selection Sort Algorithm
 * @param {number[]} array - The array to sort
 */

function selectionSort(array) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
}


/**
 * Function to update the bar chart after sorting
 * @param {number[]} data - The sorted data to be visualized
 */

function updateBarChart(data) {
    d3.select("#chart svg")
        .selectAll("rect")
        .data(data)
        .transition()
        .duration(750)
        .attr("y", d => yScale(d))
        .attr("height", d => height - yScale(d));
}


// Initialize the visualization with a random array
const data = generateRandomArray(30);
createBarChart(data);

// Add UI elements and event listeners for sorting
// This could include buttons for different algorithms and a start/stop button for the sorting process
// The UI code is not implemented here but would be similar to the following:

// d3.select("#bubbleSortButton").on("click", () => sortArray(data, 'bubbleSort'));
// d3.select("#selectionSortButton").on("click", () => sortArray(data, 'selectionSort'));
