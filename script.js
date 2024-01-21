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

// Storing correct and given answers respectively
const correctAns = [], givenAns = [], questionsArray = [];

function displayQuizQuestions(questions) {
    questionIndex.innerHTML = `Question ${questionCounter + 1} of ${questions.length}:`;
    questionDiv.innerHTML = `<p>${questions[questionCounter].question}</p>`;

    // Use a temporary DOM element for decoding HTML entities
    let tempElement = document.createElement('div');
    tempElement.innerHTML = questions[questionCounter].correct_answer;
    correctAns.push(tempElement.textContent || tempElement.innerText);

    questionsArray.push(questions[questionCounter].question)

    const options = [...questions[questionCounter].incorrect_answers, questions[questionCounter].correct_answer];
    const shuffledOptions = shuffle(options);

    optionDiv.innerHTML = shuffledOptions
        .map((option, index) => `<button onclick="selectOption(this)">${option}</button>`)
        .join('');

    //in last quaestion the next button changes to submit button
    if (questionCounter == 9) {
        document.querySelector('.next-button').innerHTML = "Submit";
    }

    questionCounter++;
}

//displaying next question
const nextQuestion = () => {
    const selectedOption = document.querySelector('.selected').innerHTML.toString();
    if (questionCounter <= 9) {
        givenAns.push(selectedOption);
        displayQuizQuestions(quizData);
    }
    else {
        givenAns.push(selectedOption);
        console.error('No quiz data available.');
        //end of quiz-score calculation
        calculateScore();

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
    // Deselect all buttons
    document.querySelectorAll('.option button').forEach(btn => btn.classList.remove('selected'));

    // Select the clicked button
    button.classList.add('selected');
};

/// Function to calculate score and redirecting
const calculateScore = () => {
    var score = 0;
    for (i = 0; i < 10; i++) {
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



