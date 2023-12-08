
load_quizz("qcm_1");

function load_quizz(quizz) {

    let bonne_reponse
    let reponses = [...document.getElementsByClassName("reponse")];
    let question_index = 0
    let data
    let explication
    const element = document.body; 
    let bubbleInterval, feuilleInterval, nuageInterval, neigeInterval, noelInterval;


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
    let retourButton = document.getElementById("retour");
    retourButton.style.display="none";
    let image = document.getElementById("image");

    const checkReponse = (event) => { 
        validateButton.disabled = true
        question_index++;
        if (question_index < data[quizz].length)
            nextButton.style.display = "inline"
            validateButton.style.display = "none";
        let reponse = document.getElementsByClassName("selected-reponse")[0]
        // si bonne reponse selectionne
        if (reponse.textContent === bonne_reponse) {
            reponse.classList.add("right-reponse");
            image.src = "./img/" + data[quizz][question_index-1].image_bonne_reponse
            // si mauvaise reponse selectionne :
        } else {
            // mettre ne rouge la reponse selectionnee (fausse)
            reponse.classList.add("bad-reponse");
            // surligner la bonne reponse
            
            reponses.forEach((rep) => {
                if (rep.textContent === bonne_reponse) {
                    rep.classList.add("right-reponse");
                    if (question_index >= data[quizz].length-1) {
                        retourButton.style.display = "block";
                        //validateButton.style.display = "none";
                    } 
                }
            });
        
            // mettre l'image correspondant 
            image.src = "./img/" + data[quizz][question_index-1].image_mauvaise_reponse
        }
        //document.querySelector("p").style.display ="block";
        //document.querySelector("p").textContent = explication;
        document.getElementById("para").querySelector("p").style.display="block";
        document.getElementById("para").querySelector("p").textContent = explication;
    }

    validateButton.addEventListener("click", checkReponse);

    nextButton.addEventListener("click", () => {
        reponses.forEach((rep) => {
            rep.classList.remove("selected-reponse", "right-reponse", "bad-reponse");
            
        })    
        validateButton.disabled = true;
        nextButton.style.display = "none";
        //validateButton.style.display = "none";


        console.log(question_index);
        console.log(data[quizz].length);

            loadQuestion(question_index);

    })

    const loadQuestion = (index) => { 
        validateButton.style.display = "inline";
        document.getElementById("para").querySelector("p").style.display="none";
        document.getElementById("para").querySelector("p").textContent = "";
        image.src = "./img/" + data[quizz][index].image_base

        let question = document.getElementById("question-text");
        question.textContent = data[quizz][index].question;

        bonne_reponse = data[quizz][index].options[0];
        data[quizz][index].options.sort(() => Math.random() - 0.5);

        explication = data[quizz][index].explication;

        them = data[quizz][index].theme;


        switch(them){
            case "1":
                clearInterval(bubbleInterval);
                clearInterval(feuilleInterval);
                clearInterval(nuageInterval);
                clearInterval(neigeInterval);
                clearInterval(noelInterval);
                element.style.backgroundColor = "#00159E";
                bubbleInterval = setInterval(createMultipleBubbles, 2000);
                break;
            case "2":
                clearInterval(bubbleInterval);
                clearInterval(feuilleInterval);
                clearInterval(nuageInterval);
                clearInterval(neigeInterval);
                clearInterval(noelInterval);
                element.style.backgroundColor = "#B5FFC6";
                feuilleInterval = setInterval(creerFeuille, 300); 
                break;
            case "3":
                clearInterval(bubbleInterval);
                clearInterval(feuilleInterval);
                clearInterval(nuageInterval);
                clearInterval(neigeInterval);
                clearInterval(noelInterval);
                element.style.backgroundColor = "#D1FAF8";
                nuageInterval = setInterval(creerNuage, 2000);
                break;
            case "4":
                clearInterval(bubbleInterval);
                clearInterval(feuilleInterval);
                clearInterval(nuageInterval);
                clearInterval(neigeInterval);
                clearInterval(noelInterval);
                element.style.backgroundColor = "#F6F6F6";
                neigeInterval = setInterval(creerneige, 300);
                noelInterval = setInterval(creernoel, 10000);
                break;
        }
        for (let i = 0; i < 4; i++)
            reponses[i].textContent = data[quizz][index].options[i];
    }

    reponses.forEach((rep) => {
        rep.addEventListener("click", () => {
            validateButton.disabled = false
            reponses.forEach((srep) => srep.classList.remove("selected-reponse"));
            rep.classList.add("selected-reponse");
        });
    });
}


function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 60 + 20; // Random size between 20px and 80px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 10 + 5}s`; // Shorter duration

    // Select a container for the bubbles
    const bubblesContainer = document.getElementById('anim-container');
    if (!bubblesContainer) {
        console.error('The bubbles container does not exist.');
        return;
    }
    bubblesContainer.appendChild(bubble);

    // Remove the bubble after its animation has finished
    setTimeout(() => {
        bubble.remove();
    }, (parseInt(bubble.style.animationDuration) + 5) * 1000);
}

// Create multiple bubbles at regular intervals
function createMultipleBubbles() {
    const numberOfBubbles = Math.floor(Math.random() * 10) + 5; // Random number of bubbles
    for (let i = 0; i < numberOfBubbles; i++) {
        createBubble();
    }
}


function creerFeuille() {
    const feuille = document.createElement('div');
    feuille.className = 'feuille';
    feuille.style.left = Math.random() * 100 + 'vw';
    feuille.style.animationDuration = Math.random() * 2 + 5 + 's'; // Durée aléatoire
    // Autres styles et animations...
    document.getElementById('anim-container').appendChild(feuille);

    // Supprimer la feuille après un certain temps pour éviter la surcharge
    setTimeout(() => {
        feuille.remove();
    }, 5000);
}


function creerNuage() {
    const nuage = document.createElement('div');
    nuage.className = 'nuage';
    nuage.style.left = Math.random() * 100 + 'vw';
    nuage.style.top = Math.random() * 100 + 'vh'; // Position verticale aléatoire
    nuage.style.animationDuration = Math.random() * 20 + 30 + 's';

    document.body.appendChild(nuage);

    setTimeout(() => {
        nuage.remove();
    }, 20000);
}


function creerneige() {
    const neige = document.createElement('div');
    neige.className = 'neige';
    neige.style.left = Math.random() * 100 + 'vw';
    neige.style.animationDuration = Math.random() * 2 + 5 + 's'; // Durée aléatoire
    // Autres styles et animations...
    document.getElementById('anim-container').appendChild(neige);

    // Supprimer la neige après un certain temps pour éviter la surcharge
    setTimeout(() => {
        neige.remove();
    }, 5000);
}

function creernoel() {
    const noel = document.createElement('div');
    noel.className = 'noel';
    noel.style.left = Math.random() * 100 + 'vw';
    noel.style.top = Math.random() * 100 + 'vh'; // Position verticale aléatoire
    noel.style.animationDuration = Math.random() * 20 + 30 + 's';

    document.body.appendChild(noel);

    setTimeout(() => {
        noel.remove();
    }, 10000);
}