const urlParams = new URLSearchParams(window.location.search).get('value');

// Function to start the quiz
const startQuiz = () => {
    // Redirect to quiz.html with the value as a query parameter
    window.location.href = "quiz.html?value=" + urlParams;
}
