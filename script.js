document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submit-btn');
    const message = document.getElementById('message');

    submitBtn.addEventListener('click', function() {
        const email = emailInput.value.trim().toLowerCase();
        
        if (email.endsWith('.com')) {
            message.textContent = 'Submission successful! Please check your email for a password reset link.';
            message.style.color = 'green';
        } else {
            message.textContent = 'Invalid email address. Please enter a valid .com email.';
            message.style.color = 'red';
        }
    });
});