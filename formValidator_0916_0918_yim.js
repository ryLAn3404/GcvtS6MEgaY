// 代码生成时间: 2025-09-16 09:18:55
// Function to validate form data
function validateFormData(data) {
    // Check if data is an object
    if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be an object');
    }

    // Validate email
    if (!validateEmail(data.email)) {
        return {
            isValid: false,
            errors: ['Invalid email address']
        };
    }

    // Validate password
    if (!validatePassword(data.password)) {
        return {
            isValid: false,
            errors: ['Password must be at least 8 characters long']
        };
    }

    // Add more validation rules here as needed

    // If all validations pass
    return {
        isValid: true,
        errors: []
    };
}

// Function to validate email
function validateEmail(email) {
    // Simple email validation using regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}

// Function to validate password
function validatePassword(password) {
    // Check if password length is at least 8 characters
    return password.length >= 8;
}

// Example usage
try {
    const formData = {
        email: 'test@example.com',
        password: 'password123'
    };

    const validationResult = validateFormData(formData);

    if (validationResult.isValid) {
        console.log('Form data is valid');
    } else {
        console.error('Form data is invalid:', validationResult.errors);
    }
} catch (error) {
    console.error('Error validating form data:', error.message);
}
