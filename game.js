const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timeH = document.querySelector('#timer');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeSecond = 30;

// timer code
displayTime(timeSecond);

const countDown = setInterval (()=> {
    timeSecond--;
    displayTime(timeSecond);
    if(timeSecond <= 0 || timeSecond < 1) {
        endTime();
        clearInterval(countDown);
    }
},1000)

function displayTime(second){
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timeH.innerHTML = `${min < 10 ? '0': ''}${min}:${sec < 10 ? '0': ''}${sec}`;
}
function endTime() {
    alert("You Ran Out Of Time!")
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('./end.html')
}

// end timer code

// questions array that is displayed in "game.html"
let questions = [
    {
        question: 'What is not a JavaScript Data Type?',
        choice1: 'Number',
        choice2: 'Function',
        choice3: 'String',
        choice4: 'Boolean',
        answer: 2,
    },
    {
        question: 'What is DOM?',
        choice1: 'Differential Object Manipulator',
        choice2: 'Dynamic Operator Model',
        choice3: 'Document Object Model',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question: 'What are callbacks?',
        choice1: 'When you reference a function',
        choice2: 'When a bool is set to true or false',
        choice3: 'When you reference a string variable',
        choice4: 'A function that will be executed after another function get executed',
        answer: 4,
    },
    {
        question: 'Explain "this" keyword',
        choice1: 'Refers to the object that the function is a property of',
        choice2: 'A general term used to reference booleans',
        choice3: 'Refers to a for loop',
        choice4: 'None of the above',
        answer: 1,
    }
];

// variables for points recieved for each correct answer and max questions
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect';

        // correct answer 
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }
        // incorrect answer
        if(classToApply === 'incorrect') {
            timeSecond -= 5;
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();