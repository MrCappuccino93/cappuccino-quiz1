const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'De cate credite ai nevoie sa poti promova acest an universitar?',
        choice1: '25',
        choice2: '30',
        choice3: '35',
        choice4: 'Semintele acelasi gust are',
        answer: 2,
    },
    {
        question:
            "Cat de mult ar trebui sa inveti pentru facultate?",
        choice1: "Zilnic",
        choice2: "Putin spre deloc",
        choice3: "Intre 10-20 de ore pe saptamana",
        choice4: "Ce-i aia invatat?",
        answer: 1,
    },
    {
        question: "Care este stilul corect de invatat?",
        choice1: "Mecanic",
        choice2: "Logic+Mecanic",
        choice3: "Logic",
        choice4: "Mai bagi un meci de LoL",
        answer: 3,
    },
    {
        question: "Logic vorbind, de ce ai avea nevoie ca sa poti programa eficient?",
        choice1: "Gandire de programator",
        choice2: "Browser + stack overflow",
        choice3: "Un robot care sa faca totul pentru tine",
        choice4: "De mai multi cartofi prajiti",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Intrebarea ${questionCounter} din ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()