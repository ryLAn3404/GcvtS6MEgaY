// 代码生成时间: 2025-08-03 04:19:49
// Importing D3 for DOM manipulation
const d3 = require('d3');

/**
 * Validates a string to check if it is an email
 * @param {string} email - The email to validate
 * @return {boolean} - Returns true if the email is valid, false otherwise
 */
function isValidEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

/**
 * Validates a string to check if it is a valid name
 * @param {string} name - The name to validate
 * @return {boolean} - Returns true if the name is valid, false otherwise
 */
function isValidName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

/**
 * Validates a number to check if it is a valid age
 * @param {number} age - The age to validate
 * @return {boolean} - Returns true if the age is a valid number, false otherwise
 */
function isValidAge(age) {
    return !isNaN(age) && age > 0 && age < 150;
}

/**
 * Validates form data and triggers appropriate actions
 * @param {Object} formData - The form data object
 * @return {Promise} - A promise that resolves if the form is valid, rejects otherwise
 */
function validateFormData(formData) {
    return new Promise((resolve, reject) => {
        // Validate each field
        if (!isValidEmail(formData.email)) {
            reject('Invalid email address.');
            return;
        }
        if (!isValidName(formData.name)) {
            reject('Invalid name. Names must only contain letters and spaces.');
            return;
        }
        if (!isValidAge(formData.age)) {
            reject('Invalid age. Age must be a number between 1 and 149.');
            return;
        }

        // If all validations pass
        resolve('Form data is valid.');
    });
}

/**
 * Example usage of the FormValidator
 */
const formData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
};

validateFormData(formData)
    .then((message) => console.log(message))
    .catch((error) => console.error(error));
