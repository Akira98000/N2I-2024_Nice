import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.addEventListener("DOMContentLoaded", function () {
  // Set up Three.js
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff0000); // Fond blanc

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Créer une lumière ambiante
  const ambientLight = new THREE.AmbientLight(0xffffff, 5);
  scene.add(ambientLight);

  // Créer une lumière directionnelle
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(5, 5, 5); // Position de la lumière directionnelle
  scene.add(directionalLight);

  // Load the 3D model
  const loader = new GLTFLoader();
  let object3D;

  loader.load('public/scene.glb', (gltf) => {
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
  camera.position.z = 1.25;

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

  // Désactiver le défilement lorsqu'on interagit avec le modèle
  document.addEventListener("wheel", function (event) {
    if (object3D) {
      enableScroll = false;
      // Appliquer la rotation en fonction du mouvement de la molette
      const rotationSpeed = event.deltaY / 1000;
      object3D.rotation.y += rotationSpeed;
    }
  });

  // Activer le défilement lorsque l'interaction avec le modèle est terminée
  document.addEventListener("wheel", function () {
    enableScroll = true;
  });

  // Render loop
  const animate = function () {
    requestAnimationFrame(animate);

    // Render the scene with the camera
    renderer.render(scene, camera);

    // Mettre à jour les animations Tween
    TWEEN.update();
  };

  animate();
});
