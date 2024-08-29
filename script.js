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
let gravity = 5;
let isPlatform = false;

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
    ctx.fillRect(playerX, playerY, 50, 100);
}

function updatePlayer(){
    if(!isPlatform){
        velocityY += gravity;
    }

    playerX += velocityX;
    playerY += velocityY;

    if(playerY + 100 > board.height - 50){
        isPlatform = true;
        playerY -= 150;
        velocityY = 0;
    }else{
        isPlatform = false;
    }

    drawPlayer();
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
    drawGame();
    drawEnemy();
    drawBall();
    updatePlayer();
    requestAnimationFrame(game);
}

document.addEventListener("keydown", (e) => {
    changeDirection(e, true);
});

document.addEventListener("keyup", (e) => {
    changeDirection(e, false);
});

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

function isCollide(obj1, obj2){
    return obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2;
}