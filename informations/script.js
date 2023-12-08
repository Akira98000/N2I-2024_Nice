function enlargeCard(card) {
    // Créer l'overlay
    const overlayContainer = document.querySelector('.overlay-container');
    const overlayContent = document.querySelector('.overlay-content');

    if (overlayContainer && overlayContent) {
        // Cloner la carte pour l'afficher dans l'overlay
        const clonedCard = card.cloneNode(true);
        clonedCard.classList.add('enlarged-card');

        // Cacher le dos de la carte dans le clone
        const backElement = clonedCard.querySelector('.back');
        if (backElement) {
            backElement.classList.add('hidden');
        }

        // Récupérer la div "information" de la carte
        const informationDiv = clonedCard.querySelector('.information');

        // Ajouter la div "information" à l'overlay
        overlayContent.innerHTML = ''; // Supprimer le contenu précédent
        overlayContent.appendChild(informationDiv);

        // Afficher l'overlay
        overlayContainer.style.display = 'flex';
    }
}






// Ajouter cette fonction pour restaurer la position de la carte
function restoreCardPosition(card) {
    card.style.width = '';
    card.style.height = '';
    card.style.left = '';
    card.style.top = '';
}

// Ajouter cette fonction pour fermer l'overlay
function closeOverlay() {
    const overlayContainer = document.querySelector('.overlay-container');
    if (overlayContainer) {
        overlayContainer.style.display = 'none';

        // Trouver la carte agrandie à l'intérieur de l'overlay
        const enlargedCard = overlayContainer.querySelector('.enlarged-card');

        // Restaurer la position de la carte
        if (enlargedCard) {
            restoreCardPosition(enlargedCard);
        }
    }
}

// Modifier la fonction flipContainer pour appeler enlargeCard lors du clic sur le bouton
function flipContainer(card) {
    card.classList.toggle('flipped');
    const isFlipped = card.classList.contains('flipped');
    const frontElement = card.querySelector('.front');
    const backElement = card.querySelector('.back');
    const backButton = card.querySelector('.back-button');

    if (frontElement && backElement && backButton) {
        const rotationValue = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        card.style.transform = rotationValue;
        frontElement.classList.toggle('hidden', isFlipped);
        backElement.classList.toggle('hidden', !isFlipped);

        // Afficher le bouton uniquement lorsque la carte est retournée
        backButton.style.display = isFlipped ? 'block' : 'none';

        // Ajouter un écouteur d'événements pour le clic sur le bouton
        backButton.addEventListener('click', function () {
            enlargeCard(card);
        });
    }
}

// Ajouter cette fonction pour afficher la nouvelle div dans l'overlay
function showOverlay() {
    const overlayContainer = document.querySelector('.overlay-container');
    const additionalContent = document.querySelector('.additional-content');

    if (overlayContainer && additionalContent) {
        overlayContainer.style.display = 'flex';

        // Rendre visible la nouvelle div
        additionalContent.classList.remove('hidden');
    }
}


