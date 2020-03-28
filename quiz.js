const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create question list
var questions = [
    {
        question : "Meskipun Cintamu Tak Hanya Untukku. Tapi Cobalah Sejenak Mengerti",
        imgSrc : "img/kerispatih.png" ,
        choiceA : "Demi Cinta",
        choiceB : "Mengenangmu",
        choiceC : "Bila Rasaku Ini Rasamu", 
        correct : "C"
    },
    {
        question : "Dan kamu hanya perlu terima. Dan tak harus memahami. Dan tak harus berfikir",
        imgSrc : "img/peterpan.jpg" ,
        choiceA : "Langit Tak Mendengar",
        choiceB : "Cobalah Mengerti",
        choiceC : "Di Atas Awan", 
        correct : "B"
    },
    {
        question : "Aku memang tak berhati besar. Untuk memahami hatimu disana",
        imgSrc : "img/samsons.png" ,
        choiceA : "Akhir Rasa Ini",
        choiceB : "Hey Gadis",
        choiceC : "Kisah Tak Sempurna", 
        correct : "C"
    },
    {
        question : "Lama aku terpisah, dari dirinya, sekian lama. Lama sudah berlalu, tapi jejaknya, tertanam s'lamanya",
        imgSrc : "img/sheilaon7.jpeg" ,
        choiceA : "Radio",
        choiceB : "Sephia",
        choiceC : "Seberapa Pantas", 
        correct : "A"
    },
    {
        question : "Izinkan ku serukan nama-Mu. Sebelum nyawa dalam tubuhku. Kau ambil, kembali pada-MU",
        imgSrc : "img/ungu.jpeg" ,
        choiceA : "Dengan Nafasmu",
        choiceB : "Para PencariMu",
        choiceC : "SurgaMu", 
        correct : "A"
    }
];

// create some variable
 
// for question
const lastQuestion = questions.length - 1
let runningQuestion = 0
 
// for counter
var count = 0
const questionTime = 10; //10 s
const gaugeWidth = 150; // 150 px
const gaugeUnit = gaugeWidth/questionTime
let TIMER;

// for score
let score = 0

// render a question
function renderQuestion () {
    let q = questions[runningQuestion]

    question.innerHTML = "<p>" + q.question + "</p>"
    qImg.innerHTML = "<img src=" + q.imgSrc + ">"
    choiceA.innerHTML = q.choiceA
    choiceB.innerHTML = q.choiceB
    choiceC.innerHTML = q.choiceC
}

start.addEventListener("click",startQuiz)
// start the quiz
function startQuiz(){
    start.style.display = "none"
    renderQuestion()
    quiz.style.display = "block"
    renderProgress()
    renderCounter()
    TIMER = setInterval(renderCounter, 1000) // 1000 ms or 1s
}

// render progress
function renderProgress(){
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>"
    }
}

// render counter
function renderCounter(){
    if (count <= questionTime){
        counter.innerHTML = count
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0
        asnwerIsWrong()
        if (runningQuestion < lastQuestion){
            runningQuestion++
            renderQuestion()
        } else {
            clearInterval(TIMER)
            scoreRender()
        }
    }
}

// check answer
function checkAnswer(answer){
    if (answer == questions[runningQuestion].correct){
        // answer is correct
        score ++
        asnwerIsCorrect()
    } else {
        // answer is wrong
        asnwerIsWrong()
    }
    count = 0
    if (runningQuestion < lastQuestion){
        runningQuestion++
        renderQuestion()
    } else {
        clearInterval(TIMER)
        scoreRender()
    }
}

// answer is correct

function asnwerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0"
}

function asnwerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00"
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block"
    // calculate score per answered question by user
    const scorePercent = Math.round(100 * score/questions.length)
    // display image based on scorepercent
    let img = (scorePercent >= 80) ? "img/pogchamp.png" :
              (scorePercent >= 60) ? "img/seemsgood.png" :
              (scorePercent >= 40) ? "img/kekw.png" :
              (scorePercent >= 20) ? "img/feelsbadman.png" :
              "img/notlikethis.png"
    scoreDiv.innerHTML = "<img src=" + img + ">"
    scoreDiv.innerHTML += "<p>" + scorePercent + "%</p>"

}