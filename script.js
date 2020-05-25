const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2 // Paris (index 2)
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1 // Mars (index 1)
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
        correctAnswer: 2 // Blue Whale (index 2)
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: 1 // Oxygen (index 1)
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2 // Leonardo da Vinci (index 2)
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3 // Pacific Ocean (index 3)
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correctAnswer: 2 // Australia (index 2)
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: 2 // Diamond (index 2)
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correctAnswer: 1 // Albert Einstein (index 1)
    },
    {
        question: "What is the main component of the Sun?",
        options: ["Liquid Lava", "Molten Iron", "Hydrogen Gas", "Solid Rock"],
        correctAnswer: 2 // Hydrogen Gas (index 2)
    }
];

const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const retryBtn = document.getElementById('retry-btn');
const homeBtn = document.getElementById('home-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionNumber = document.getElementById('question-number');
const progressBar = document.getElementById('progress-bar');
const timerElement = document.getElementById('timer');
const scorePercentage = document.getElementById('score-percentage');
const correctAnswers = document.getElementById('correct-answers');
const totalQuestions = document.getElementById('total-questions');
const performanceSummary = document.getElementById('performance-summary');
const themeSwitch = document.getElementById('theme-switch');

let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;
let quizCompleted = false;
let timerInterval;
let timeLeft;
let userAnswers = [];

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeSwitch.checked = true;
    }
});

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', resetQuiz);
homeBtn.addEventListener('click', goToHome);

function startQuiz() {
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }
    
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    questionNumber.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
    
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer-option');
        answerElement.textContent = option;
        answerElement.dataset.index = index;
        
        answerElement.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(answerElement);
    });
    
    selectedAnswer = -1;
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    
    clearInterval(timerInterval);
    startTimer();
}

function selectAnswer(index) {
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach(option => option.classList.remove('selected'));
    
    answerOptions[index].classList.add('selected');
    selectedAnswer = index;
    
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    
    userAnswers[currentQuestion] = index;
}

function nextQuestion() {
    if (selectedAnswer === -1) return;
    
    const correctAnswerIndex = quizData[currentQuestion].correctAnswer;
    if (selectedAnswer === correctAnswerIndex) {
        score++;
    }
    
    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(function() {
        timeLeft -= 1;
        
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            userAnswers[currentQuestion] = -1;
            currentQuestion++;
            loadQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (isNaN(timeLeft) || timeLeft < 0) {
        timeLeft = 0;
    }
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);
    
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeLeft <= 10) {
        timerElement.style.color = '#f44336';
    } else {
        timerElement.style.color = '';
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    const percentage = Math.round((score / quizData.length) * 100);
    scorePercentage.textContent = `${percentage}%`;
    correctAnswers.textContent = score;
    totalQuestions.textContent = quizData.length;
    
    generatePerformanceSummary();
    
    quizCompleted = true;
}

function generatePerformanceSummary() {
    performanceSummary.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;
        const isCorrect = userAnswer === correctAnswer;
        
        const summaryItem = document.createElement('div');
        summaryItem.classList.add('performance-item');
        
        let answerText = '';
        if (userAnswer === -1) {
            answerText = `<strong>No answer</strong> (Correct: ${question.options[correctAnswer]})`;
        } else {
            answerText = isCorrect 
                ? `<strong>Correct:</strong> ${question.options[userAnswer]}` 
                : `<strong>Incorrect:</strong> You selected "${question.options[userAnswer]}" (Correct: "${question.options[correctAnswer]}")`;
        }
        
        summaryItem.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${question.question}</p>
            <p>${answerText}</p>
        `;
        
        if (userAnswer === -1) {
            summaryItem.style.borderLeftColor = '#FFC107';
        } else if (isCorrect) {
            summaryItem.style.borderLeftColor = '#4CAF50';
        } else {
            summaryItem.style.borderLeftColor = '#F44336';
        }
        
        performanceSummary.appendChild(summaryItem);
    });
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = -1;
    quizCompleted = false;
    userAnswers = [];
    
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

function goToHome() {
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    currentQuestion = 0;
    score = 0;
    selectedAnswer = -1;
    quizCompleted = false;
    userAnswers = [];
}