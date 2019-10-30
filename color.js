var heading = document.querySelector("#heading");
var h1 = document.querySelector("h1");
var message = document.getElementById("message");
var squares = document.getElementsByClassName("square");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

var gameOngoing = true;

var numTiles = 6;

var colors = getColors(numTiles);
var pickedColor = colorpicker(colors);
var score = 0;
document.querySelector("#score").textContent = score;
heading.textContent = pickedColor;

for (let i = 0;  i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function() {
        if (gameOngoing){
            var clickedColor = this.style.backgroundColor;
            
            if (clickedColor === pickedColor) {
                message.textContent = "CORRECT!!!";
                gameOngoing = false;
                if (numTiles==3)
                {score = score + 1;}
                else {score = score + 2;}
                document.querySelector("#score").textContent = score;
                changeColors(clickedColor);
                victoryBlink();
                setTimeout(reset, 2000);
            }
            else {
                message.textContent = "WRONG! TRY AGAIN."
                this.style.backgroundColor = "#232323";
                this.style.borderColor = "#232323";
            }
        }
    })
}

resetButton.addEventListener("click",reset);

easyBtn.addEventListener("click", function() {
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");

    numTiles = 3;
    reset();
});

hardBtn.addEventListener("click", function() {
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");

    numTiles = 6;
    reset();
});


function getColors(num) {
    let arr = [];
    for (let i =0; i < num; i++) {
        arr.push(colorMaker());
    }
    return arr;
}
function colorMaker() {
    let r = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function colorpicker(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function reset() {
    gameOngoing = true;
    h1.classList.remove("wincolor");
    h1.classList.add("default-bg-col")

    colors = getColors(numTiles);
    console.log(colors.length);
    console.log(colors);
    pickedColor = colorpicker(colors);
    heading.textContent = pickedColor;
    message.textContent = "Guess the Color of the RGB values above";

    for (let i = 0; i<squares.length; i++) {
        if (colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }

} 

function victoryBlink() {
    let intervalID = setInterval( function(){
        h1.classList.toggle("wincolor");
    },300)  
    setTimeout(function(){
        clearInterval(intervalID);

    }, 2000); 
}

function changeColors(col) {
    for(let i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = col;
    }
    h1.classList.remove("default-bg-col")
    h1.style.backgroundColor = col;
}