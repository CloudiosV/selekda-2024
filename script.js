let board = document.getElementById("board");
let ctx = board.getContext("2d");
board.width = 800;
board.height = 400;
let mouseDown = false;
let widthSize = document.getElementById("width-size");
let widthRange = document.getElementById("width");
let opacityValue = 1;
let currentTool = "brush";
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let r = 0;
let g = 0;
let b = 0;
let startX = 0;
let startY = 0;
let objectWidth = 0;
let objectHeight = 0;
let color = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
let rgb = document.getElementById("rgb");
let moveObj;
let brushModel = "circle";
let scale = 1;
let scaleSize = 0.1;
let impor = document.getElementById("import");
let canvasLayer = [];
let currentText = '';
let textPosition = { x: 0, y: 0 };

window.onload = function(){ 
    drawCanvas();
    startDrawing();
}

function drawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, board.width, board.height);
}

function cvsMouseDown(e){
    mouseDown = true;
    startX = e.offsetX / scale;
    startY = e.offsetY / scale;
}

function cvsMouseMove(e){
    if(mouseDown){
        ctx.beginPath();
        let currentX = e.offsetX;
        let currentY = e.offsetY;
        
        if(currentTool == "brush") {
            ctx.fillStyle = color;
            if(brushModel == "circle"){
                ctx.arc(e.offsetX, e.offsetY, widthRange.value, 0, 2 * Math.PI);
                ctx.fill();
            }else if(brushModel == "rectangle"){
                ctx.fillRect(e.offsetX - widthRange.value / 2, e.offsetY - widthRange.value / 2, widthRange.value, widthRange.value);
            }
        }else if(currentTool == "eraser") {
            ctx.fillStyle = `rgba(255, 255, 255)`;
            if(brushModel == "circle"){
                ctx.arc(e.offsetX, e.offsetY, widthRange.value, 0, 2 * Math.PI);
                ctx.fill();
            }else if(brushModel == "rectangle"){
                ctx.fillRect(e.offsetX - widthRange.value / 2, e.offsetY - widthRange.value / 2, widthRange.value, widthRange.value);
            }
        }else if(currentTool == "circle"){
            ctx.fillStyle = color;
            objectWidth = currentX - startX;
            objectHeight = currentY - startY;
            let radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.fill();
        }else if(currentTool == "rectangle"){
            ctx.fillStyle = color;
            objectWidth = currentX - startX;
            objectHeight = currentY - startY;
            ctx.fillRect(startX, startY, objectWidth, objectHeight);
        }

        ctx.closePath();
    }
}

function cvsMouseUp(e){
    mouseDown = false;
    if(currentTool == "line"){
        ctx.strokeStyle = color;
        ctx.lineWidth = widthRange.value;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.closePath();
    }else if(currentTool == "bucket"){
        drawBucket();
    }else if(currentTool == "text"){
        board.addEventListener('click', function (e) {
            let textInput = prompt("Enter your text:");
            if (textInput) {
                currentText = textInput;
                textPosition = { x: e.offsetX, y: e.offsetY };
                drawText();
            }
        });
    }
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

function brushType(type){
    brushModel = type;
}

function move(){
    currentTool = "move";
}

function textLocation() {
    board.addEventListener('click', function(e) {
        if (currentTool === "text") {
            let textInput = prompt("Enter your text:");
            if (textInput) {
                currentText = textInput;
                textPosition = { x: e.offsetX, y: e.offsetY };
                drawText();
            }
        }
    });
}

function drawText(){
    if (currentText) {
        ctx.font = "20px Arial";
        ctx.fillStyle = color;
        ctx.fillText(currentText, textPosition.x, textPosition.y);
    }
}

function pickerLocation() {
    board.addEventListener('click', function(e) {
        if (currentTool === "picker") {
            let imageData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            r = imageData[0];
            g = imageData[1];
            b = imageData[2];
            color = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
            displayColor(); // Memperbarui tampilan elemen RGB
        }
    });
}

function displayColor(){
    rgb.style.backgroundColor = color;
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

function adjust(type){
    if(type == "brightness"){

    }else if(type == "saturation"){
        
    }else if(type == "greyscale"){
        
    }else if(type == "opacity"){
        
    }
}

function shapeType(type){
    currentTool = type;
}

function zoomIn(){
    if(scale < 1.1){
        scale += scaleSize;
        zoom();
    }
}

function zoomOut(){
    if(scale > scaleSize){
        scale -= scaleSize;
        zoom();
    }
}

function zoom(){
    ctx.save();
    ctx.clearRect(0, 0, board.width, board.height);
    ctx.scale(scale, scale);
    drawCanvas();
    ctx.restore();
}

function undo(){

}

function redo(){

}

function bucket(){
    currentTool = "bucket";
}

function tool(current){
    currentTool = current;

    if (currentTool === "picker") {
        pickerTool();
    } else if (currentTool === "text") {
        textLocation();
    }
}

function drawBucket(){
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, board.width, board.height);
}

impor.addEventListener('change', (e) => {
    let file = e.target.files[0];
    let fr = new FileReader();
    fr.onload = function(){
        let img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 50, 50, 200, 200);
        }
        img.src = fr.result;
    }
    fr.readAsDataURL(file);
});

function download(){
    let image = board.toDataURL();
    let link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = image;
    link.click();
}

function startDrawing(){
    rangeValue();
    changingColor();
    displayColor();
    requestAnimationFrame(startDrawing);
}