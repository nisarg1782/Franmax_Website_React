// validateLogin.js
export default function validateLogin({ email, password }) {
    const errors = {};

    // Email validation
    if (!email) {
        errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!password) {
        errors.password = 'Password is required.';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
}
