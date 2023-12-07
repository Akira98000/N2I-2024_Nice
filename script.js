/*class Quizz {
    constructor(name) {
        this.name = name;
        this.score
        this.questionIndex
        this.bonne_reponse
        this.file = JSON.parse(fs.readFileSync(name));
    }

    loadQuizz(quizz) {
        score = 0
        questionIndex = 0

        let image = document.getElementById("image");
        image.src = file[quizz][questionIndex].options
        let reponses = [...document.getElementsByClassName("reponse")];
        let question = document.getElementById("question");
        bonne_reponse = file[quizz][questionIndex].options[0].texte_option
        reponses.forEach()
    }

    checkReponse(event) {
        if (event.target.textContent) {

        } 
    }
}

quizz = new Quizz("data.json");

console.log("test")

let reponses = [...document.getElementsByClassName("reponse")];
console.log(reponses)
reponses.forEach((rep) => {
    rep.addEventListener("click", quizz.checkReponse);
    console.log("tests")
});*/

let bonne_reponse
let reponses = [...document.getElementsByClassName("reponse")];
let question_index = 0
let data

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) { 
        data = JSON.parse(xhr.responseText);
        loadQuestion(question_index)
    }
}
xhr.send()

let nextButton = document.getElementById("next");
const checkReponse = (event) => { 
    nextButton.style.display = "block"
    if (event.target.textContent === bonne_reponse) {

    } 
    question_index++;
}

nextButton.addEventListener("click", () => {
    nextButton.style.display = "none";
    loadQuestion(question_index);
})

const loadQuestion = (index) => { 
    let image = document.getElementById("image");
    image.src = data["qcm_1"][index].image_base

    let question = document.getElementById("question-text");
    question.textContent = data["qcm_1"][index].question

    let bonne_reponse = data["qcm_1"][index].options[0];
    data["qcm_1"][index].options.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++)
        reponses[i].textContent = data["qcm_1"][index].options[i];
}

reponses.forEach((rep) => {
    rep.addEventListener("click", checkReponse);
});