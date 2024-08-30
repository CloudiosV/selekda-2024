let board = document.getElementById("board");
let ctx = board.getContext("2d");
board.width = 800;
board.height = 400;
let mouseDown = false;

window.onload = function(){ 
    drawCanvas();
    startDrawing();
}

function drawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, board.width, board.height);
}

function cvsMouseDown(){
    mouseDown = true;
    console.log("down")
}

function cvsMouseMove(e){
    if(mouseDown){
        ctx.beginPath();

        ctx.fillStyle = "black";
        ctx.arc(e.offsetX, e.offsetY, 5, 0, 2 * Math.PI)
        ctx.fill();

        ctx.closePath();
    }
}

function cvsMouseUp(){
    mouseDown = false;
    console.log("up")
}

function startDrawing(){
    cvsMouseOver();
    requestAnimationFrame(startDrawing);
}