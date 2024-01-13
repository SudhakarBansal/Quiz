const data = {
    "results": [
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "Which figure from Greek mythology traveled to the underworld to return his wife Eurydice to the land of the living?",
            "correct_answer": "Orpheus",
            "incorrect_answers": [
                "Hercules",
                "Perseus",
                "Daedalus"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "What mythology did the god &quot;Apollo&quot; come from?",
            "correct_answer": "Greek and Roman",
            "incorrect_answers": [
                "Roman and Spanish",
                "Greek and Chinese",
                "Greek, Roman and Norse"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "Which Greek &amp; Roman god was known as the god of music, truth and prophecy, healing, the sun and light, plague, poetry, and more?",
            "correct_answer": "Apollo",
            "incorrect_answers": [
                "Aphrodite",
                "Artemis",
                "Athena"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "The Nike apparel and footwear brand takes it&#039;s name from the Greek goddess of what?",
            "correct_answer": "Victory",
            "incorrect_answers": [
                "Courage",
                "Strength",
                "Honor"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "Who was the only god from Greece who did not get a name change in Rome?",
            "correct_answer": "Apollo",
            "incorrect_answers": [
                "Demeter",
                "Zeus",
                "Athena"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "Which of these mythological creatures is said to be half-man and half-horse?",
            "correct_answer": "Centaur",
            "incorrect_answers": [
                "Minotaur",
                "Pegasus",
                "Gorgon"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "Who in Greek mythology, who led the Argonauts in search of the Golden Fleece?",
            "correct_answer": "Jason",
            "incorrect_answers": [
                "Castor",
                "Daedalus",
                "Odysseus"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "The greek god Poseidon was the god of what?",
            "correct_answer": "The Sea",
            "incorrect_answers": [
                "War",
                "Sun",
                "Fire"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "This Greek goddess&#039;s name was chosen for the dwarf planet responsible for discord on Pluto&#039;s classification amongst astronomers.",
            "correct_answer": "Eris",
            "incorrect_answers": [
                "Charon",
                "Ceres",
                "Dysnomia"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Mythology",
            "question": "In Greek mythology, who is the god of wine?",
            "correct_answer": "Dionysus",
            "incorrect_answers": [
                "Hephaestus",
                "Demeter",
                "Apollo"
            ]
        }
    ]
}

const quesContainer = document.getElementById('quesContainer');

data.results.forEach((element, index) => {
    const questionDiv = document.createElement('div');
    const optionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    optionDiv.classList.add('option');
    questionDiv.innerHTML = `<p>${index + 1}. ${element.question}</p>`;
    optionDiv.innerHTML = `<p>a) ${element.incorrect_answers[0]}</p>
    <p>b) ${element.incorrect_answers[1]}</p>
    <p>c) ${element.incorrect_answers[2]}</p>
    <p>d) ${element.correct_answer}</p>`
    quesContainer.appendChild(questionDiv);
    questionDiv.appendChild(optionDiv);
});
