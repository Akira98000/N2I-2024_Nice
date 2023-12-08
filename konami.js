const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
];

let konamiCodePosition = 0;

function handleKonamiCode(e) {
    console.log(e.key);
    if (e.key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;
        if (konamiCodePosition === konamiCode.length) {
            activateSecretFunction();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
}

function activateSecretFunction() {
    console.log("Félicitations ! Vous avez déclenché la fonctionnalité secrète !");
    window.location.href = "jeuTri/index.html";
}

document.addEventListener('keydown', handleKonamiCode);
