import Player from "./Player.js";
import ObjectController from "./ObjectController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/background.png";

var player = new Player(canvas, 3, null);
var score = new Score();
var objectController = new ObjectController(canvas, player, score);

canvas.addEventListener("click", function(event) 
{
    if(score.getScore() < 0)
    {
        player = new Player(canvas, 3, null);
        score = new Score();
        objectController = new ObjectController(canvas, player, score);
    }
});

function game()
{
    if(score.getScore() < 0)
    {
        let text = "Game Over";
        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / 5, canvas.height / 2);
        objectController.stop();
        document.getElementById("score").innerHTML = "Score : " + 0;
        ctx.fillText("Click to restart", canvas.width / 7, canvas.height / 1.5);
    }
    else
    {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        objectController.update();
        objectController.draw(ctx);
        document.getElementById("score").innerHTML = "Score : " + score.getScore();
    }
    
  }

setInterval(game, 1000 / 60);