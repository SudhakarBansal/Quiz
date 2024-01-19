// Get the value from the URL
var urlParams = new URLSearchParams(window.location.search);
var buttonValue = urlParams.get('value');

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
function displayQuizQuestions(questions) {
    const quesContainer = document.getElementById('quesContainer');

    //storing correct and given ans respectively
    const correctAns=[], givenAns=[];

    questions.forEach((element, index) => {
        const questionIndex = document.createElement('div');
        const questionDiv = document.createElement('div');
        const optionDiv = document.createElement('div');

        questionIndex.classList.add('questionIndex');
        questionDiv.classList.add('question');
        optionDiv.classList.add('option');



        questionIndex.innerHTML = `Question ${index + 1} of ${questions.length}:`;
        questionDiv.innerHTML = `<p>${element.question}</p>`;

        correctAns.push(`${element.correct_answer}`);
        var myArray = [`${element.incorrect_answers[0]}`,`${element.incorrect_answers[1]}`, `${element.incorrect_answers[2]}`, `${element.correct_answer}`]; 
       var shuffledArray = shuffle(myArray); 
        optionDiv.innerHTML = `<button>a)${shuffledArray[0]}</button>
            <button>b)${shuffledArray[1]} </button>
            <button>c)${shuffledArray[2]}</button>
            <button>d)${shuffledArray[3]}</button>`;

        quesContainer.appendChild(questionIndex);
        quesContainer.appendChild(questionDiv);
        questionDiv.appendChild(optionDiv);
    });
    console.log(correctAns)
}

// Execute the logic
(async function () {
    if (!buttonValue) {
        console.error('Button value not found in the URL.');
        return;
    }

    const quizData = await fetchQuizData(buttonValue);

    if (quizData.length > 0) {
        displayQuizQuestions(quizData);
    } else {
        console.error('No quiz data available.');
    }
})();


//when data is fetched then add correct ans to array usig push-done 
//add selected ans to another array
//compare both arrays
//display score
// option should change color when selected (on click value is accessed and then stored in array)


//to shuffle options
const shuffle = (array) => { 
  return array.sort(() => Math.random() - 0.5); 
}; 

