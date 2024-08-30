let board = document.getElementById("board");
let ctx = board.getContext("2d");
board.width = 800;
board.height = 400;
let mouseDown = false;
let widthSize = document.getElementById("width-size");
let widthRange = document.getElementById("width");
let opacityValue = 100;
let currentTool = "brush";
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let r = 0;
let g = 0;
let b = 0;
let color = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
let rgb = document.getElementById("rgb");

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
        
        if (currentTool === "brush") {
            ctx.fillStyle = color;
            ctx.arc(e.offsetX, e.offsetY, widthRange.value, 0, 2 * Math.PI);
            ctx.fill();
        } else if (currentTool === "eraser") {
            ctx.fillStyle = `rgba(255, 255, 255)`;
            ctx.arc(e.offsetX, e.offsetY, widthRange.value, 0, 2 * Math.PI);
            ctx.fill();
        }

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
    currentTool = "eraser";
}

function brush(){
    color = `rgba(${r}, ${g}, ${b}, ${opacityValue})`; 
    currentTool = "brush";
}

function text(){
    currentTool = "text";
}

function changingColor(){
    r = red.value;
    g = green.value;
    b = blue.value;
    color = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
}

function displayColor(){
    rgb.style.backgroundColor = `rgba(${r}, ${g}, ${b})`
}

function startDrawing(){
    rangeValue();
    changingColor();
    displayColor();
    requestAnimationFrame(startDrawing);
}