// 代码生成时间: 2025-08-29 04:20:10
// Importing D3 library
const d3 = require('d3');

class FormValidator {
  /**
   * Initializes the FormValidator with a selector for the form element and validation rules.
   * @param {string} formSelector - CSS selector for the form element.
   * @param {Object} rules - An object containing validation rules.
   */
  constructor(formSelector, rules) {
    this.form = d3.select(formSelector);
    this.rules = rules;
  }

  /**
   * Validates the form by checking each input against the provided rules.
   * @returns {boolean} - True if the form is valid, False otherwise.
   */
  validateForm() {
    let isValid = true;

    // Iterate over each rule and validate the corresponding form field.
    for (let field in this.rules) {
      const rule = this.rules[field];
      const input = this.form.select(`[name=${field}]`);
      const value = input.node().value.trim();

      // Check if the input is present and apply the validation rule.
      if (!input.empty() && !this.applyRule(value, rule)) {
        isValid = false;
        input.node().classList.add('error');
      } else {
        input.node().classList.remove('error');
      }
    }

    return isValid;
  }

  /**
   * Applies a validation rule to the given value.
   * @param {string} value - The value to validate.
   * @param {Object} rule - The validation rule to apply.
   * @returns {boolean} - True if the value passes the validation, False otherwise.
   */
  applyRule(value, rule) {
    switch (rule.type) {
      case 'required':
        return value !== '';
      case 'email':
        return /^[^@]+@[^@]+\.[^@]+$/.test(value);
      case 'minLength':
        return value.length >= rule.minLength;
      case 'maxLength':
        return value.length <= rule.maxLength;
      default:
        console.warn(`Validation rule type ${rule.type} is not supported.`);
        return false;
    }
  }
}

// Example usage:
// Define validation rules
const rules = {
//   username: { type: 'required', minLength: 3 },
//   email: { type: 'required', type: 'email' },
//   password: { type: 'required', minLength: 8 }
// };

// Create a new validator instance
// const validator = new FormValidator('#myForm', rules);

// Validate the form on submit
// d3.select('#myForm').on('submit', (event) => {
//   event.preventDefault();
//   if (validator.validateForm()) {
//     // Form is valid, proceed with form submission
//     console.log('Form is valid!');
//   } else {
//     // Form is invalid, display error messages
//     console.log('Form is invalid!');
//   }
// });