// Getting score value and arrays from URL
const urlParam = new URLSearchParams(window.location.search);
const scoreval = urlParam.get('value');
const questions = JSON.parse(urlParam.get('questions'));
const correctAnswers = JSON.parse(urlParam.get('correctAnswers'));
const givenAnswers = JSON.parse(urlParam.get('givenAnswers'));

document.querySelector('.score').innerHTML = `<h1>Your Score</h1><p>${scoreval}/10</p>`;

// Display score details after redirecting to score.html
const scoreDetailsContainer = document.getElementById('scoreResult');

questions.forEach((element, index) => {
    const questionDiv = document.createElement('div');
    const correctAnsDiv = document.createElement('div');
    const userAnsDiv = document.createElement('div');
    questionDiv.classList.add('question', 'card');
    questionDiv.innerHTML = `<p>${index + 1}. ${element}</p>`;
    correctAnsDiv.innerHTML = `<strong>Correct Answer:</strong> ${correctAnswers[index]}`;
    userAnsDiv.innerHTML = `<strong>Your Answer:</strong> ${givenAnswers[index]}`;

    scoreDetailsContainer.appendChild(questionDiv);
    questionDiv.appendChild(correctAnsDiv);
    questionDiv.appendChild(userAnsDiv);
});        