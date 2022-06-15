// Bai 1
var arrA = [1,2,"a"];
var arrB = [1,3,'b'];
var arrC=[];
var arr = arrA.concat(arrB);
 for(var i = 0; i < arrA.length; i++){
    for(var j = 0; j < arrB.length; j++){
        if(arrA[i] == arrB[j]){
            arrC.push(arrA[i]);
        }
    }
 }

 for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arrC.length;j++){
        if(arr[i] == arrC[j]){
            arr.splice(i,1);
        }
    }
 }
 console.log(arr);



// Bai 2
var arr = [
    {
        name: "Arsenal",
        points: 99,
        GD: 45,
    },
    {
        name: "Chelsea",
        points: 75,
        GD: 39,
    },
    {
        name: "Manches United",
        points: 60,
        GD: 29,
    },
    {
        name: "Arsenal",
        points: 88,
        GD: 39,
    },
]

var arrsort1 = arr.sort(function (a,b){
   if(a.points === b.points){
        if(a.GD === b.GD){
            if(a.name > b.name) return 1;
            if(a.name < b.name) return -1;
            if(a.name == b.name) return 0;
        }
        return a.GD - b.GD
   } return b.points - a.points
});

arr.forEach((item,index) => {
    item.position = index + 1
})

console.log(arrsort1);



// Bai 3


const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again')
const _result = document.getElementById('result');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 5


function eventListeners(){
    _checkBtn.addEventListener('click',checkAnswer)
    _playAgainBtn.addEventListener('click',restartQuiz)
}

document.addEventListener('DOMContentLoaded',()=>{
    loadQuestion()
    eventListeners()
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
})

async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple'
    const result = await fetch(`${APIUrl}`)
    const data = await result.json()
    _result.innerHTML = ""
    showQuestion(data.results[0])
}

// display question and option
function showQuestion(data) {
    _checkBtn.disabled = false
    correctAnswer = data.correct_answer
    let incorrectAnswer = data.incorrect_answers
    let optionsList = incorrectAnswer
    // Insert right answer in random position
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length +1)),0,correctAnswer)
    
    _question.innerHTML = `${data.question} <br> <span class = "category"> ${data.category}
    </span>`
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span> ${option} </span> </li>
        `).join('')}
    `

    selectOption()
}

function selectOption(){
    _options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click',()=> {
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        })
    })
}

function checkAnswer(){
    _checkBtn.disabled = true
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent
        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)){
            correctScore++
            _result.innerHTML = `<p> <i class = "fas fa-check"></i> Correct Answer, you got 10 points! </p>`
        } else {
            _result.innerHTML = `<p> <i class = "fas fa-times"></i> Incorrect Answer! </p> 
            <p> <small><b> Correct Answer: </b> ${correctAnswer}</small></ </p>`
        }
        checkCount()
    } else {
        _result.innerHTML = `<p> Please select an option! </p>`
        _checkBtn.disabled = false
    }
}

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html")
    return doc.documentElement.textContent
}

function checkCount(){
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        _result.innerHTML = `<p> Your score is ${correctScore * 10}</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(() => {
            loadQuestion()
        },300)
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion
    _correctScore.textContent = correctScore
}

function restartQuiz(){
    correctScore = askedCount = 0
    _playAgainBtn.style.display = "none"
    _checkBtn.style.display = "block"
    _checkBtn.disabled = false
    setCount()
    loadQuestion()
}