let timer;
let intervalCounter = 0;
let timerExpired = false;

// Get the value from the URL
const urlParams = new URLSearchParams(window.location.search);
const buttonValue = urlParams.get('value');
let quizData = null;
let questionCounter = 0;

// Function to fetch quiz data from the API
async function fetchQuizData(buttonValue) {
    const api_url = `https://opentdb.com/api.php?amount=10&category=${buttonValue}&type=multiple`;

    try {
        const response = await fetch(api_url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        return [];
    }
}

// Function to display quiz questions in the HTML
const questionIndex = document.querySelector('.questionIndex');
const questionDiv = document.querySelector('.question');
const optionDiv = document.querySelector('.option');
const nextButton = document.querySelector('.next-button');
nextButton.disabled = true; //disbale the button in the begining
// Storing correct and given answers respectively
const correctAns = [], givenAns = [], questionsArray = [];

function displayQuizQuestions(questions) {
    // Clear the timer before starting a new one
    clearInterval(timer);
    intervalCounter = 15; // Reset intervalCounter
    timerExpired = false; // Reset the timerExpired flag

    questionIndex.innerHTML = `Question ${questionCounter + 1} of ${questions.length}:`;
    questionDiv.innerHTML = `<p>${questions[questionCounter].question}</p>`;

    startTimer(); // Remove the argument, as intervalCounter is now global

    // Use a temporary DOM element for decoding HTML entities
    let tempElement = document.createElement('div');
    tempElement.innerHTML = questions[questionCounter].correct_answer;
    correctAns.push(tempElement.textContent || tempElement.innerText);

    questionsArray.push(questions[questionCounter].question);

    const options = [...questions[questionCounter].incorrect_answers, questions[questionCounter].correct_answer];
    const shuffledOptions = shuffle(options);

    optionDiv.innerHTML = shuffledOptions
        .map((option, index) => `<button onclick="selectOption(this)">${option}</button>`)
        .join('');

    // In the last question, the next button changes to the submit button
    if (questionCounter == 9) {
        document.querySelector('.next-button').innerHTML = "Submit";
    }

    questionCounter++;
}

// Displaying next question
const nextQuestion = () => {
    // Check if the timer has already expired to prevent multiple calls
    if (!timerExpired) {
        // Clear the timer before moving to the next question
        clearInterval(timer);

        const selectedOption = document.querySelector('.selected');
        if (questionCounter <= 9) {
            if (selectedOption == null) {
                givenAns.push("Time limit Exceeded");
            } else {
                const selectedValue = selectedOption.innerHTML.toString();
                givenAns.push(selectedValue);
            }

            // Move to the next question
            displayQuizQuestions(quizData);


            // Disable the next button again
            nextButton.disabled = true;

        } else {
            // If on the last question, evaluate the answer
            if (selectedOption == null && intervalCounter === 0) {
                // If both the timer is zero and no option selected, add "Time limit Exceeded"
                givenAns.push("Time limit Exceeded");
            } else if (selectedOption != null) {
                // If an option is selected, add its value
                const selectedValue = selectedOption.innerHTML.toString();
                givenAns.push(selectedValue);
            } else {
                // Handle other cases (you can customize this part based on your requirements)
                givenAns.push("Not Answered");
            }

            console.error('No quiz data available.');
            // End of quiz-score calculation
            calculateScore();

            // Set the flag to prevent multiple calls
            timerExpired = true;
        }
    }
};

// Execute the logic
(async function () {
    if (!buttonValue) {
        console.error('Button value not found in the URL.');
        return;
    }

    quizData = await fetchQuizData(buttonValue);

    if (quizData.length > 0) {
        displayQuizQuestions(quizData);
    } else {
        console.error('No quiz data available.');
    }
})();

// Function to shuffle options
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const selectOption = (button) => {
    let stopExecution = false;

    // Deselect all buttons
    const buttons = document.querySelectorAll('.option button');
    for (let i = 0; i < buttons.length; i++) {      //Tranversing through all buttons
        const btn = buttons[i];

        if (btn.classList.contains('selected')) {   //checking ig selected button is choosen again
            btn.classList.remove('selected');       // deselect the selected in that case
            stopExecution = true;
            nextButton.disabled = true;
            break; // Exit the loop
        }
        btn.classList.remove('selected');
    }

    // Check if we should stop the execution
    if (stopExecution) {
        return;
    }

    // Select the clicked button
    button.classList.add('selected');

    // Enable the next button
    nextButton.disabled = false;
};

// Function to calculate score and redirecting
const calculateScore = () => {
    var score = 0;
    for (let i = 0; i < 10; i++) {
        if (correctAns[i] == givenAns[i]) {
            score++;
        }
    }

    // Append arrays as parameters to the URL
    const urlParams = new URLSearchParams();
    urlParams.set('value', score);
    urlParams.set('questions', JSON.stringify(questionsArray));
    urlParams.set('correctAnswers', JSON.stringify(correctAns));
    urlParams.set('givenAnswers', JSON.stringify(givenAns));

    // Redirect to score.html with parameters
    window.location.href = "score.html?" + urlParams.toString();
};

const startTimer = () => {
    const clockDiv = document.querySelector('#clock');
    timer = setInterval(() => {
        clockDiv.innerHTML = intervalCounter;
        if (intervalCounter === 0) {
            clearInterval(timer);
            nextQuestion();
        } else {
            intervalCounter--;
        }
    }, 1000);
}
