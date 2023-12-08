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
let validateButton = document.getElementById("validate");
let image = document.getElementById("image");

const checkReponse = (event) => { 
    validateButton.disabled = true
    question_index++;
    if (question_index < data["qcm_1"].length)
        nextButton.style.display = "block"
    let reponse = document.getElementsByClassName("selected-reponse")[0]
    if (reponse.textContent === bonne_reponse) {
        reponse.classList.add("right-reponse");
        image.src = "./img/" + data["qcm_1"][question_index-1].image_bonne_reponse
    } else {
        reponse.classList.add("bad-reponse");
        image.src = "./img/" + data["qcm_1"][question_index-1].image_mauvaise_reponse
    }
}

validateButton.addEventListener("click", checkReponse);

nextButton.addEventListener("click", () => {
    reponses.forEach((rep) => {
        rep.classList.remove("selected-reponse", "right-reponse", "bad-reponse")
    })    
    validateButton.disabled = true;
    nextButton.style.display = "none";
    loadQuestion(question_index);
})

const loadQuestion = (index) => { 
    image.src = "./img/" + data["qcm_1"][index].image_base

    let question = document.getElementById("question-text");
    question.textContent = data["qcm_1"][index].question

    bonne_reponse = data["qcm_1"][index].options[0];
    data["qcm_1"][index].options.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++)
        reponses[i].textContent = data["qcm_1"][index].options[i];
}

reponses.forEach((rep) => {
    rep.addEventListener("click", () => {
        validateButton.disabled = false
        reponses.forEach((srep) => srep.classList.remove("selected-reponse"));
        rep.classList.add("selected-reponse");
    });
});