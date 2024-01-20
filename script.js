// Get the value from the URL
const urlParams = new URLSearchParams(window.location.search);
const buttonValue = urlParams.get('value');
let quizData = null;
let questionCounter = 0;

// Function to fetch quiz data from the API
async function fetchQuizData(buttonValue) {
    const api_url = `https://opentdb.com/api.php?amount=10&category=${buttonValue}&difficulty=easy&type=multiple`;

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
const correctAns = [], givenAns = [];

function displayQuizQuestions(questions) {
    questionIndex.innerHTML = `Question ${questionCounter + 1} of ${questions.length}:`;
    questionDiv.innerHTML = `<p>${questions[questionCounter].question}</p>`;

    correctAns.push(questions[questionCounter].correct_answer);

    const options = [...questions[questionCounter].incorrect_answers, questions[questionCounter].correct_answer];
    const shuffledOptions = shuffle(options);

    optionDiv.innerHTML = shuffledOptions
        .map((option, index) => `<button onclick="selectOption(this)">${option}</button>`)
        .join('');
    
        //in last quaestion the next button changes to submit button
        if(questionCounter==9)
        {
            document.querySelector('.next-button').innerHTML="Submit";
        }

    questionCounter++;
}

//displaying next question
const nextQuestion = () => {
    const selectedOption = document.querySelector('.selected').innerHTML.toString();
    if (questionCounter <=9) {
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

//calculating score and redirecting
const calculateScore=()=>{
    var score=0;
    for(i=0;i<10;i++)
    {
        if(correctAns[i]==givenAns[i])
        {
            score++;
        }
    }
    window.location.href = "score.html?value=" + score;
}


