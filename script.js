let board = document.getElementById("board");
let ctx = board.getContext("2d");
board.width = 1000;
board.height = 600;
let velocityX = 0;
let velocityY = 0;
let velocityBallX = 0;
let velocityBallY = 5;
let playerX = 200;
let playerY = board.height - 150;
let ballX = board.width / 2 - 50;
let ballY = 0;
let gravity = 2;
let isOnGround = false; 
let goalX = 0;
let goalY = board.height - 200;
let enemyGoalX = board.width - 30;
let enemyGoalY = board.height - 200;
let playerHit = false;
let ballW = 40;
let ballH = 40;
let froze = false;
let enemyX = 700;
let enemyY = board.height - 100;
let ballSpeedInterval;
let slowBallX = 0;

let imgGoal1 = new Image();
imgGoal1.src = 'assets/Goal - Side.png';

let imgGoal2 = new Image();
imgGoal2.src = 'assets/Goal - Side 2.png';

let imgBall = new Image();
imgBall.src = 'assets/Ball 01.png';

let imgBackGround = new Image();
imgBackGround.src = 'assets/background2.jpg';

let imgDecrease = new Image();
imgDecrease.src = 'assets/'

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
    ctx.fillRect(enemyX, enemyY, 50, 100);
}

function drawBall(){
    ctx.fillStyle = "black";
    ctx.fillRect(ballX, ballY, ballW, ballH);
}

function updateBall(){
    if(!froze){
        ballX += velocityBallX + slowBallX;
        ballY += velocityBallY + slowBallX;    
    }

    if(!isOnGround){
        ballH += gravity;
    }

    if(ballY + 40 > board.height){ 
        ballY = board.height - 40;
        isOnGround = true;
    }else{
        isOnGround = false;
    }

    if(ballX < 0){
        velocityBallX = 2;
    }else if(ballX + 40 >= board.width){
        velocityBallX = -2
    }

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
    if(isCollide({x: goalX, y: goalY, w: 30, h: 200}, {x: ballX, y: ballY, w: ballW, h: ballH})){
        alert("you lose");
        ballX = board.width / 2;
        ballY = 0;
        velocityBallY = 3;
        winner();
    }

    if(isCollide({x: enemyGoalX, y: enemyGoalY, w: 30, h: 200}, {x: ballX, y: ballY, w: ballW, h: ballH})){
        alert("you scored");
        ballX = board.width / 2;
        ballY = 0;
        velocityBallY = 3;
        winner();
    }

    if(isCollide({x: playerX, y: playerY, w: 30, h: 100}, {x: ballX, y: ballY, w: ballW, h: ballH}) && playerHit){
        velocityBallX = 3;
        velocityBallY = -10;

        setTimeout(() => {
            velocityBallY = gravity;
        }, 500);

        ballSpeedInterval = setInterval(() => {
            slowBallX -= 0.1;
        }, 500);

        setTimeout(() => {
            clearInterval(ballSpeedInterval);
            slowBallX = 0;
        }, 1500);
    }

    if(isCollide({x: playerX, y: playerY, w: 30, h: 100}, {x: ballX, y: ballY, w: ballW, h: ballH})){
        velocityBallX = 2;
        setTimeout(() => {
            velocityBallY = gravity;
        }, 500);
        
        ballSpeedInterval = setInterval(() => {
            slowBallX -= 0.1;
        }, 500);

        setTimeout(() => {
            clearInterval(ballSpeedInterval);
            slowBallX = 0;
        }, 1500);
    }

    if(isCollide({x: enemyX, y: enemyY, w: 30, h: 100}, {x: ballX, y: ballY, w: ballW, h: ballH})){
        velocityBallX = -2;
        setTimeout(() => {
            velocityBallY = gravity;
        }, 500);

        ballSpeedInterval = setInterval(() => {
            slowBallX += 0.1;
        }, 500);

        setTimeout(() => {
            clearInterval(ballSpeedInterval);
            slowBallX = 0;
        }, 1500);
    }

    // increase
    for(let i = 0; i < increase.length; i++){
        if(isCollide({x: playerX, y: playerY, w: 50, h: 100}, increase[i])){
            ballW += 10;
            ballH += 10;
            increase.splice(i, 1);
        }
    }

    // decrease
    for(let i = 0; i < decrease.length; i++){
        if(isCollide({x: playerX, y: playerY, w: 50, h: 100}, decrease[i])){
            ballW -= 10;
            ballH -= 10;
            decrease.splice(i, 1);
        }
    }

    // freeze
    for(let i = 0; i < freeze.length; i++){
        if(isCollide({x: playerX, y: playerY, w: 50, h: 100}, freeze[i])){
            froze = true;
            freeze.splice(i, 1);
            setTimeout(() => {
                froze = false;
            }, 3500);
        }
    }
}

function winner(){
    velocityX = 0;
    velocityY = 0;
    velocityBallX = 0;
    velocityBallY = 5;
    playerX = 200;
    playerY = board.height - 150;
    ballX = board.width / 2 - 50;
    ballY = 0;
    gravity = 2;
    isOnGround = false; 
    goalX = 0;
    goalY = board.height - 200;
    enemyGoalX = board.width - 30;
    enemyGoalY = board.height - 200;
    playerHit = false;
    ballW = 40;
    ballH = 40;
    froze = false;
    enemyX = 700;
    enemyY = board.height - 100;
    ballSpeedInterval;
    slowBallX = 0;
    increase = [];
    decrease = [];
    freeze = [];
    drawGame();
}