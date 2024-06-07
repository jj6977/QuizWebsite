let questions = [
    {
        question: "Which is the largest Ocean in the World",
        answers: [
            {text: "Atlantic Ocean" , correct: false},
            {text: "Indian Ocean" , correct: false},
            {text: "Pacific Ocean" , correct: true},
            {text: "Southern Ocean" , correct: false}
        ]
    },
    {
        question: "Which is the biggest Country in the World",
        answers: [
            {text: "America" , correct: false},
            {text: "China" , correct: false},
            {text: "India" , correct: false},
            {text: "Russia" , correct: true}
        ]
    },
    {
        question: "Which of the following Animal has gone Extinct",
        answers: [
            {text: "Sea Snake" , correct: false},
            {text: "Dinosaur" , correct: true},
            {text: "Apes" , correct: false},
            {text: "Lion" , correct: false}
        ]
    },
    {
        question: "Which is the Smallest Desert in the World",
        answers: [
            {text: "Sahara Desert" , correct: false},
            {text: "Gobi Desert" , correct: false},
            {text: "Carcross Desert" , correct: true},
            {text: "Kalahari Desert" , correct: false}
        ]
    }
];

let questionElement = document.getElementById("question");
let answerbutton = document.getElementById("answerButtons");
let nextbutton = document.getElementById("nextButton");

let CurrentQuestionIndex = 0;
let score = 0;

function StartQuiz(){
    CurrentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[CurrentQuestionIndex];
    let questionNo = CurrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const Button = document.createElement("button");
        Button.innerHTML = answer.text;
        Button.classList.add("btn");
        answerbutton.appendChild(Button);
        if(answer.correct){
            Button.dataset.correct = answer.correct;
        }
        Button.addEventListener("click", selectAnswer)
    });     
}

function resetState(){
    nextbutton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(Button => {
        if(Button.dataset.correct === "true"){
            Button.classList.add("correct");
        }
        Button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function handleNextButton(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextbutton.addEventListener("click", ()=>{
    if(CurrentQuestionIndex < questions.length){
         handleNextButton();
    }
    else{
        StartQuiz();
    }
})

StartQuiz();