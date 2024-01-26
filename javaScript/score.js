// Getting score value and arrays from URL
const urlParam = new URLSearchParams(window.location.search);
const scoreval = urlParam.get('value');
const questions = JSON.parse(urlParam.get('questions'));
const correctAnswers = JSON.parse(urlParam.get('correctAnswers'));
const givenAnswers = JSON.parse(urlParam.get('givenAnswers'));

// Speech assistance...
const speechSynthesis = window.speechSynthesis; //it is a entry point into using web speech api
const scoreSpeech = `You Scored ${scoreval} out of 10;`;
let conditionalSpeech = "";

if (scoreval <= 3) {
    conditionalSpeech = scoreSpeech + " " + "No Problem! better luck next Time;";
} else if (scoreval > 3 && scoreval <= 6) {
    conditionalSpeech = scoreSpeech + " " + "Hmmmm Nice Try; better luck next Time;";
} else {
    conditionalSpeech = scoreSpeech + " " + "Congrats! you achieved a solid score;";
}

const textToSpeak = conditionalSpeech + " " + "Thanks for Using Quizy; By";
if (textToSpeak) {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);// interface gets and sets the voice that will be used to speak the utterance.
    speechSynthesis.speak(utterance);
}

// showing scores
document.querySelector('.score').innerHTML = `<h1>Your Score</h1><p>${scoreval}/10</p>`;

// Display score detail card
const scoreDetailsContainer = document.getElementById('scoreResult');

questions.forEach((element, index) => {
    const questionDiv = document.createElement('div');
    const correctAnsDiv = document.createElement('div');
    const userAnsDiv = document.createElement('div');

    // Giving different colors for right and wrong answers
    if (correctAnswers[index] == givenAnswers[index]) {
        questionDiv.classList.add('question-correct', 'card');
    } else {
        questionDiv.classList.add('question-wrong', 'card');
    }

    questionDiv.innerHTML = `<p>${index + 1}. ${element}</p>`;
    correctAnsDiv.innerHTML = `<strong>Correct Answer:</strong> ${correctAnswers[index]}`;
    userAnsDiv.innerHTML = `<strong>Your Answer:</strong> ${givenAnswers[index]}`;

    scoreDetailsContainer.appendChild(questionDiv);
    questionDiv.appendChild(correctAnsDiv);
    questionDiv.appendChild(userAnsDiv);
});
