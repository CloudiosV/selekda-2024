let board = document.getElementById("board");
let ctx = board.getContext("2d");
board.width = 1000;
board.height = 600;
let velocityX = 0;
let velocityY = 0;
let playerX = 200;
let playerY = board.height - 100;
let ballX = board.width / 2 - 50;
let ballY = board.height - 100;

window.onload = function(){
    drawGame();
    drawPlayer();
    drawEnemy();
    drawBall();
    game();
}

function drawGame(){
    ctx.fillStyle = "#efefef";
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle = "white";
    ctx.fillRect(100, board.height - 200, 30, 200);
    ctx.fillRect(800 + 30, board.height - 200, 30, 200);
}

function drawPlayer(){
    ctx.fillStyle = "blue";
    ctx.fillRect(200, board.height - 100, 50, 100);
}

function drawEnemy(){
    ctx.fillStyle = "red";
    ctx.fillRect(700, board.height - 100, 50, 100);
}

function drawBall(){
    ctx.fillStyle = "black";
    ctx.fillRect(ballX, ballY, 50, 50);
}

function game(){

}

function changeDirection(e, move){
    if(move){
        if(e.code == "KeyA"){
            velocityX -= 5;
        }else if(e.code == "KeyD"){
            velocityX += 5;
        }else if(e.code == "KeyW" || e.code == "Space"){
            velocityY -= 20;
        }
    }else{
        if(e.code == "KeyA" || e.code == "KeyD"){
            velocityX = 0;
        }
    }
}