let board = document.getElementById("board");
let ctx = board.getContext("2d");
board.width = 1000;
board.height = 600;
let velocityX = 0;
let velocityY = 0;
let velocityBallX = -3;
let velocityBallY = 0;
let playerX = 200;
let playerY = board.height - 150;
let ballX = board.width / 2 - 50;
let ballY = board.height - 100;
let gravity = 2;
let isOnGround = false; 
let goalX = 100;
let goalY = board.height - 200;
let enemyGoalX = 830;
let enemyGoalY = board.height - 200;
let playerHit = false;

//powerup
let increase = [];
let decrease = [];
let freeze = [];

window.onload = function(){
    game();
    setInterval(spawnRandom, 5000);
}

function drawGame(){
    ctx.fillStyle = "#efefef";
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle = "white";
    ctx.fillRect(goalX, goalY, 30, 200); 
    ctx.fillRect(enemyGoalX, enemyGoalY, 30, 200); 
}

function drawPlayer(){
    ctx.fillStyle = "blue";
    ctx.fillRect(playerX, playerY, 50, 100);
}

function updatePlayer(){
    if(!isOnGround){
        velocityY += gravity;
    }

    playerX += velocityX;
    playerY += velocityY;

    if(playerY + 100 > board.height){ 
        playerY = board.height - 100;
        isOnGround = true;
    }else{
        isOnGround = false;
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

function updateBall(){
    ballX += velocityBallX;
    ballY += velocityBallY;

    drawBall();
}

function spawnRandom(){
    let chance = Math.floor(Math.random() * 10);
    if(chance < 4){
        locationIncrease();
    }else if(chance < 7){
        locationDecrease();
    }else if(chance < 10){
        locationFreeze();
    }
}

function locationIncrease(){
    let x = Math.floor(Math.random() * (800 - 200)) + 200;
    increase.push({x, y: 0, w: 30, h: 30});
}

function drawIncrease(){
    ctx.fillStyle = "red";
    for(let i = 0; i < increase.length; i++){
        let e = increase[i];
        e.y += 5;
        ctx.fillRect(e.x, e.y, e.w, e.h);
    }
}

function locationDecrease(){
    let x = Math.floor(Math.random() * (800 - 200)) + 200;
    decrease.push({x, y: 0, w: 30, h: 30});
}

function drawDecrease(){
    ctx.fillStyle = "orange";
    for(let i = 0; i < decrease.length; i++){
        let e = decrease[i];
        e.y += 5;
        ctx.fillRect(e.x, e.y, e.w, e.h);
    }
}

function locationFreeze(){
    let x = Math.floor(Math.random() * (800 - 200)) + 200;
    freeze.push({x, y: 0, w: 30, h: 30});
}

function drawFreeze(){
    ctx.fillStyle = "aqua";
    for(let i = 0; i < freeze.length; i++){
        let e = freeze[i];
        e.y += 5;
        ctx.fillRect(e.x, e.y, e.w, e.h);
    }
}

function game() {
    drawGame();
    drawEnemy();
    drawBall();
    updatePlayer();
    updateBall();
    isCollisions();
    drawIncrease();
    drawFreeze();
    drawDecrease();
    requestAnimationFrame(game);
}

document.addEventListener("keydown", (e) => {
    changeDirection(e, true);
});

document.addEventListener("keyup", (e) => {
    changeDirection(e, false);
});

function changeDirection(e, move) {
    if(move){
        if (e.code == "KeyA"){
            velocityX = -5;
        }else if(e.code == "KeyD"){
            velocityX = 5;
        }else if(e.code == "KeyW"){
            if(isOnGround){
                velocityY = -30;
                isOnGround = false;
            }
        }else if(e.code == "Space"){
            playerHit = true;
        }
    }else{
        if(e.code == "KeyA" || e.code == "KeyD"){
            velocityX = 0;
        }if(e.code == "Space"){
            playerHit = false;
        }
    }
}

function isCollide(obj1, obj2){
    return obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.y + obj1.h > obj2.y;
}

function isCollisions(){
    if(isCollide({x: goalX, y: goalY, w: 30, h: 200}, {x: ballX, y: ballY, w: 50, h: 50})){
        alert("you lose");
        ballX = board.width / 2;
        ballY = board.height - 100;
        velocityBallX = -3;
        velocityBallY = 0;
    }

    if(isCollide({x: enemyGoalX, y: enemyGoalY, w: 30, h: 200}, {x: ballX, y: ballY, w: 50, h: 50})){
        alert("you scored");
        ballX = board.width / 2;
        ballY = board.height - 100;
        velocityBallX = -3;
        velocityBallY = 0;
    }

    if(isCollide({x: playerX, y: playerY, w: 50, h: 100}, {x: ballX, y: ballY, w: 50, h: 50}) && playerHit){
        velocityBallX = 3;
        velocityBallY = -10;
        setTimeout(() => {
            velocityBallY = gravity;
        }, 500);
    }

    // increase
    if(isCollide({x: playerX, y: playerY, w: 50, h: 100}, {x: ballX, y: ballY, w: 50, h: 50}) && playerHit){
        velocityBallX = 3;
        velocityBallY = -10;
        setTimeout(() => {
            velocityBallY = gravity;
        }, 500);
    }
}
