import Player from "./Player.js";
import ObjectController from "./ObjectController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
var highScore = 0;

const background = new Image();
background.src = "images/background.png";

var player = new Player(canvas, 3, null);
var score = new Score();
var objectController = new ObjectController(canvas, player, score);
var first = true;

canvas.addEventListener("click", function(event) 
{
    if(first)
    {
        first = false;
        objectController = new ObjectController(canvas, player, score);
    }
    if(score.getScore() < 0)
    {
        player = new Player(canvas, 3, null);
        score = new Score();
        objectController = new ObjectController(canvas, player, score);
    }
});

function game()
{
    if(first)
    {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        objectController.stop();
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'; 
        ctx.fillText("Récupérer les objets à trier", canvas.width / 2, canvas.height / 4);
        ctx.fillText("Utiliser les flêches gauche et droite du clavier", canvas.width / 2, canvas.height / 2.5);
        ctx.fillText("Mais attention aux erreurs", canvas.width / 2, canvas.height / 1.75);
        ctx.fillText("Cliquez pour commencer", canvas.width / 2, canvas.height / 1.25);
    }
    else if(score.getScore() < 0)
    {
        let text = "Game Over";
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 4);
        objectController.stop();
        document.getElementById("score").innerHTML = "Score : " + 0;
        ctx.fillText("Raison : " + score.getRaison() == "" ? "score < 0" : score.getRaison(), canvas.width / 2, canvas.height / 3);
        ctx.fillText("Cliquer pour redémarrer", canvas.width / 2, canvas.height / 2);
    }
    else
    {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        objectController.update();
        objectController.draw(ctx);
        document.getElementById("score").innerHTML = "Score : " + score.getScore();
        if(score.getScore() > highScore) 
        {
            highScore = score.getScore();
            document.getElementById("highscore").innerHTML = "Meilleur score : " + highScore;
        }
    }
    
  }

setInterval(game, 1000 / 60);