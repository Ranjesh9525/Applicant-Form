// script.js

// Handle form step navigation
document.addEventListener('DOMContentLoaded', () => {
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitButton = document.querySelector('.submit-btn');

    let currentStep = 0;

    // Function to show the current step
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.style.display = (index === stepIndex) ? 'block' : 'none';
        });
        updateButtonVisibility(stepIndex);
    }

    // Function to update button visibility based on current step
    function updateButtonVisibility(stepIndex) {
        prevButtons.forEach(button => button.style.display = (stepIndex === 0) ? 'none' : 'inline-block');
        submitButton.style.display = (stepIndex === formSteps.length - 1) ? 'inline-block' : 'none';
    }

    // Event listeners for "Next" buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Event listeners for "Previous" buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Event listener for "Submit" button
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                document.getElementById('multiStepForm').submit();
            }
        });
    }

    // Initial display of the first step
    showStep(currentStep);

    // Function to validate inputs for the current step
    function validateStep(stepIndex) {
        const currentStepElement = formSteps[stepIndex];
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.name === 'aadhaar' && !/^\d{12}$/.test(input.value)) {
                alert('Aadhaar Number must be exactly 12 digits.');
                input.classList.add('invalid');
                isValid = false;
            } else if (input.name === 'mobile' && !/^\d{10}$/.test(input.value)) {
                alert('Mobile Number must be exactly 10 digits.');
                input.classList.add('invalid');
                isValid = false;
            } else if (input.name === 'email' && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(input.value)) {
                alert('Email must be a valid Gmail address.');
                input.classList.add('invalid');
                isValid = false;
            } else if (input.name === 'voterID' && !/^[A-Za-z0-9]{10,}$/.test(input.value)) {
                alert('Voter ID must be valid.');
                input.classList.add('invalid');
                isValid = false;
            } else if (input.name === 'pan' && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(input.value)) {
                alert('PAN Card Number must be valid (e.g., AAAAA1234A).');
                input.classList.add('invalid');
                isValid = false;
            } else if (!input.checkValidity()) {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });

        return isValid;
    }
});
