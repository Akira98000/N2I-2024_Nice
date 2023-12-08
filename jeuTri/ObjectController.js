import Object from "./Object.js";
import Player from "./Player.js";

export default class ObjectController {
    constructor(canvas, player, score) {
      this.canvas = canvas;
      this.player = player;
      this.objects = [];
      this.intervalId = null;
      this.score = score;
  
      // Vitesse de descente des objets
      this.objectSpeed = 2;
  
      // Interval de génération d'objets (en millisecondes)
      this.objectGenerationInterval = 2000;
  
      // Créer un nouvel objet à intervalles réguliers
      this.intervalId = setInterval(() => {
        this.generateObject();
      }, this.objectGenerationInterval);
    }
  
    generateObject() {
      const x = Math.random() * (this.canvas.width - 50); // Position horizontale aléatoire
      const y = 0; // Départ en haut du canvas
      const imageNumber = Math.floor(Math.random() * 4) + 1; // Numéro d'image aléatoire
      const object = new Object(x, y, imageNumber, imageNumber%2 == 0);
  
      this.objects.push(object);
      console.log("object generated");
    }
  
    update() {
      // Fait descendre les objets
      this.objects.forEach((object, index) => {
        object.move(0, this.objectSpeed);
  
        // Vérifie si l'objet touche le joueur
        if (object.collideWith(this.player)) {
          this.objects.splice(index, 1); // Supprime l'objet
            if(object.isEnemy())
            {
                this.score.reset(); // Réinitialise le score
                this.score.decrement(1); // Décrémente le score
            }
            else this.score.increment(1); // Décrémente le score
        }
  
        // Vérifie si l'objet est en bas du canvas
        if (object.y >= this.canvas.height) {
          // Réapparition en haut du canvas
          this.objects.splice(index, 1);
            if(!object.isEnemy())
            {
                this.score.decrement(2);
            }
        }
      });
    }
  
    draw(ctx) {
      // Dessine tous les objets
      this.objects.forEach((object) => {
        object.draw(ctx);
      });
    }
  
    stop() {
      clearInterval(this.intervalId); // Arrête la génération d'objets
    }
  }
  