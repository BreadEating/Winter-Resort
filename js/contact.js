document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form fields
            const isValid = validateForm();
            
            if (isValid) {
                // Form is valid, you can submit it or process the data
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }
    
    // Add input event listeners for auto-formatting
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const cityInput = document.getElementById('city');
    
    if (firstNameInput) {
        firstNameInput.addEventListener('blur', capitalizeFirstLetter);
    }
    
    if (lastNameInput) {
        lastNameInput.addEventListener('blur', capitalizeFirstLetter);
    }
    
    if (cityInput) {
        cityInput.addEventListener('blur', capitalizeFirstLetter);
    }
    
    // Function to capitalize first letter of each word
    function capitalizeFirstLetter(e) {
        const input = e.target;
        const words = input.value.trim().toLowerCase().split(' ');
        
        const capitalizedWords = words.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return '';
        });
        
        input.value = capitalizedWords.join(' ');
    }
    
    // Main validation function
    function validateForm() {
        let isValid = true;
        
        // Validate first name
        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        } else {
            clearError(firstName);
        }
        
        // Validate last name
        const lastName = document.getElementById('lastName');
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        } else {
            clearError(lastName);
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // Validate city
        const city = document.getElementById('city');
        if (!city.value.trim()) {
            showError(city, 'City is required');
            isValid = false;
        } else {
            clearError(city);
        }
        
        // Validate zip code
        const zip = document.getElementById('zip');
        const zipRegex = /^\d{5}$/;
        if (!zip.value.trim()) {
            showError(zip, 'Zip code is required');
            isValid = false;
        } else if (!zipRegex.test(zip.value)) {
            showError(zip, 'Zip code must be 5 digits');
            isValid = false;
        } else {
            clearError(zip);
        }
        
        return isValid;
    }
    
    // Helper function to show error messages
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.textContent = message;
        } else {
            const errorElement = document.createElement('p');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = 'red';
            errorElement.style.marginTop = '5px';
            errorElement.style.fontSize = '0.9em';
            formControl.appendChild(errorElement);
        }
        
        input.style.borderColor = 'red';
    }
    
    // Helper function to clear error messages
    function clearError(input) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        
        if (errorMessage) {
            formControl.removeChild(errorMessage);
        }
        
        input.style.borderColor = '';
    }
});