document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearErrors();

    // Get form values
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    // Validate form fields
    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }

    // Show loading spinner
    document.getElementById("loading").style.display = "block";

    // Prepare the payload
    const data = JSON.stringify({
        username: email,
        password: password
    });

    // Send the POST request
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loading").style.display = "none";
        if (data.id) { // Simulate success
            document.getElementById("successMessage").style.display = "block";
        }
    })
    .catch(error => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("apiError").textContent = "Login failed. Please try again.";
    });
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (password.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters long.";
        return false;
    }
    return true;
}

function clearErrors() {
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("apiError").textContent = "";
}

document.getElementById("showPassword").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    if (this.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
});
