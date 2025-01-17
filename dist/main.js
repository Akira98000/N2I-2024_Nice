import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import TWEEN from '@tweenjs/tween.js';
import { TweenMax, Power2 } from 'gsap';

// Set up Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xEEE1B3); // Fond

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créer une lumière ambiante
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);

// Créer une lumière directionnelle
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 5, 5); // Position de la lumière directionnelle
scene.add(directionalLight);

// Load the 3D model
const loader = new GLTFLoader();
let object3D;

loader.load('low_poly_planet_earth.glb', (gltf) => {
  object3D = gltf.scene;

  // Centrer l'objet
  object3D.position.set(0, 0, 0);

  scene.add(object3D);

  // Animer l'objet pour se déplacer vers le centre
  animateObjectToCenter();
});

// Animation pour déplacer l'objet vers le centre
function animateObjectToCenter() {
  const initialPosition = object3D.position.clone();
  const targetPosition = new THREE.Vector3(0, 0, 0);

  new TWEEN.Tween(initialPosition)
    .to(targetPosition, 2000) // Temps de l'animation en millisecondes
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      object3D.position.copy(initialPosition);
    })
    .start();
}

// Set up the camera position
camera.position.z = 2.5;
camera.position.y = 1;

// Variable pour activer ou désactiver le défilement
let enableScroll = true;

// Scroll event listener for rotation
document.addEventListener("scroll", function (event) {
  if (!enableScroll) {
    // Empêcher le défilement par défaut
    event.preventDefault();
  }

  // Appliquer la rotation uniquement si le modèle 3D est chargé
  if (object3D) {
    const rotationSpeed = window.pageYOffset / 50;
    object3D.rotation.y = rotationSpeed;
  }
});

document.addEventListener("wheel", function (event) {
    if (object3D) {
        enableScroll = false;

        // Direction du défilement
        const direction = event.deltaY > 0 ? 1 : -1;

        // Calculer la nouvelle position du scroll
        scrollPosition = Math.min(100, Math.max(0, scrollPosition + direction));

        // Appliquer la rotation en fonction du mouvement de la molette
        const rotationSpeed = direction * 0.1;
        object3D.rotation.y -= rotationSpeed;

        // Effacer le texte précédent
        const previousInfoElement = document.getElementById(scrollPosition === 5 ? 'infoRight' : 'infoLeft');
        if (previousInfoElement) {
            document.body.removeChild(previousInfoElement);
        }

        // Vérifier si la position de défilement est entre 0 et 1
        if (scrollPosition === 0) {

          // Récupérer l'élément avec l'ID "info"
          const infoElement = document.getElementById('info');

          if (!infoElement) {
            // Créer un nouvel élément HTML avec l'ID "info"
            const newInfoElement = document.createElement('div');
            newInfoElement.id = 'info';
            newInfoElement.textContent = 'Pensez à scroller'; // Ajoutez le contenu souhaité

            // Ajouter le nouvel élément au body du document
            document.body.appendChild(newInfoElement);

            // Utiliser GSAP pour animer l'entrée de l'élément
            TweenMax.to(newInfoElement, 1, {
              opacity: 1,
              y: 20,  // Réinitialiser la propriété Y à 0
              ease: Power2.easeOut
            });
          }
        }

        if (scrollPosition >= 1) {
          // Supprimer l'élément avec l'ID "info"
          const infoElementToRemove = document.getElementById('info');
          if (infoElementToRemove) {
            // Utiliser GSAP pour animer la sortie de l'élément
            TweenMax.to(infoElementToRemove, 1, {
              opacity: 0,
              y: -50,
              ease: Power2.easeOut,
              onComplete: function () {
                // Une fois l'animation terminée, supprimer l'élément du DOM
                if (infoElementToRemove.parentNode) {
                  infoElementToRemove.parentNode.removeChild(infoElementToRemove);
                }
              }
            });
          }
        }
        
        console.log(scrollPosition)

        // Afficher le texte seulement lorsque scrollPosition est égal à 5 ou 10
        if (scrollPosition == 5) {
          if (direction === 1) {
            const infoElementToRemove = document.getElementById('infoRight');
            if (infoElementToRemove) {
              // Utiliser GSAP pour animer la sortie de l'élément
              TweenMax.to(infoElementToRemove, 1, {
                opacity: 0,
                y: -50,
                ease: Power2.easeOut,
                onComplete: function () {
                  // Une fois l'animation terminée, supprimer l'élément du DOM
                  if (infoElementToRemove.parentNode) {
                    infoElementToRemove.parentNode.removeChild(infoElementToRemove);
                  }
                }
              });
            }
          } else {
            const infoElementToRemove = document.getElementById('infoRight');
          if (infoElementToRemove) {
            // Utiliser GSAP pour animer la sortie de l'élément
            TweenMax.to(infoElementToRemove, 1, {
              opacity: 0,
              y: 50,
              ease: Power2.easeOut,
              onComplete: function () {
                // Une fois l'animation terminée, supprimer l'élément du DOM
                if (infoElementToRemove.parentNode) {
                  infoElementToRemove.parentNode.removeChild(infoElementToRemove);
                }
              }
            });
          }}
            // Créer un élément HTML pour le texte
            const infoElement = document.createElement('div');
            const infoId = 'infoRight';
            infoElement.id = infoId;
            infoElement.innerHTML = direction > 0
                ? "L'écologie, un enjeu majeur pour l'avenir de notre planète"
                : '';
  
            infoElement.textContent;
            document.body.appendChild(infoElement);
  
            // Animer le texte avec GSAP - fade in ou fade out
            if (direction === 1) {
              TweenMax.fromTo(infoElement, 1, { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: Power2.easeIn });
            }
            if (direction === -1) {
              TweenMax.fromTo(infoElement, 1, { opacity: 1, y: 0 }, { opacity: 0, y: 50, ease: Power2.easeOut });
            }
        }

        if (scrollPosition == 25) {
          if (direction === 1) {
          const infoElementToRemove = document.getElementById('infoRight');
          if (infoElementToRemove) {
            // Utiliser GSAP pour animer la sortie de l'élément
            TweenMax.to(infoElementToRemove, 1, {
              opacity: 0,
              y: -50,
              ease: Power2.easeOut,
              onComplete: function () {
                // Une fois l'animation terminée, supprimer l'élément du DOM
                if (infoElementToRemove.parentNode) {
                  infoElementToRemove.parentNode.removeChild(infoElementToRemove);
                }
              }
            });
          }
        } else {
          const infoElementToRemove = document.getElementById('infoRight');
        if (infoElementToRemove) {
          // Utiliser GSAP pour animer la sortie de l'élément
          TweenMax.to(infoElementToRemove, 1, {
            opacity: 0,
            y: 50,
            ease: Power2.easeOut,
            onComplete: function () {
              // Une fois l'animation terminée, supprimer l'élément du DOM
              if (infoElementToRemove.parentNode) {
                infoElementToRemove.parentNode.removeChild(infoElementToRemove);
              }
            }
          });
        }}
          // Créer un élément HTML pour le texte
          const infoElement = document.createElement('div');
          const infoId = 'infoRight';
          infoElement.id = infoId;
          infoElement.innerHTML = direction > 0
              ? "Agissons, c'est urgent !"
              : '';

          infoElement.textContent;
          document.body.appendChild(infoElement);

          // Animer le texte avec GSAP - fade in ou fade out
          if (direction === 1) {
            TweenMax.fromTo(infoElement, 1, { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: Power2.easeIn });
          }
          if (direction === -1) {
            TweenMax.fromTo(infoElement, 1, { opacity: 1, y: 0 }, { opacity: 0, y: 50, ease: Power2.easeOut });
          }
      }

        // Activer le défilement lorsque l'interaction avec le modèle est terminée
        document.addEventListener("wheel", function () {
            enableScroll = true;
        });
    }
});

  
  
  // Déclarer la variable scrollPosition en dehors de l'événement
  let scrollPosition = 0;
 

// Render loop
const animate = function () {
  requestAnimationFrame(animate);

  // Render the scene with the camera
  renderer.render(scene, camera);

  // Mettre à jour les animations Tween
  TWEEN.update();
};

animate();
