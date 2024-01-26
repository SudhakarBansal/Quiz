// Function to redirect to quiz instructions

function redirectToQuiz(value) {
    // Use encodeURIComponent to ensure proper encoding of special characters
    var encodedValue = encodeURIComponent(value);

    // Redirect to instruction.html with the value as a query parameter
    window.location.href = "instruction.html?value=" + encodedValue;
}