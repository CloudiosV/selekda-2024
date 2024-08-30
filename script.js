let board = document.getElementById("board");
let ctx = board.getContext("2d");
board.width = 800;
board.height = 400;
let mouseDown = false;
let widthSize = document.getElementById("width-size");
let widthRange = document.getElementById("width");
let opacityValue = 100;
let color = `rgba(0, 0, 0, ${opacityValue})`;

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

        ctx.fillStyle = color;
        ctx.arc(e.offsetX, e.offsetY, widthRange.value, 0, 2 * Math.PI)
        ctx.fill();

        ctx.closePath();
    }
}

function cvsMouseUp(){
    mouseDown = false;
    console.log("up")
}

function rangeValue(){
    widthSize.innerHTML = `${widthRange.value} px`
}

function opacity(e){
    opacityValue = `${e}%`;
}

function eraser(){
    color = `rgba(255, 255, 255, ${opacityValue})`
}

function brush(){
    color = `rgba(0, 0, 0, ${opacityValue})`; 
}

function text(){
    
}

function startDrawing(){
    rangeValue();
    requestAnimationFrame(startDrawing);
}