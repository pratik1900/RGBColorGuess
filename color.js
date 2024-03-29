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
var streak_score = 0;
var lose = 0;
document.querySelector("#score").textContent = score;
document.querySelector("#streak_score").textContent = streak_score;
heading.textContent = pickedColor;

var timeleft = 13;


for (let i = 0;  i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function() {
        if (gameOngoing){
            var clickedColor = this.style.backgroundColor;
            
            if (clickedColor === pickedColor) {
                message.textContent = "CORRECT!!!";
                gameOngoing = false;
                if (numTiles==3)
                {score = score + 1;
                    streak_score = streak_score+1;}
                else {score = score + 2;
                    streak_score = streak_score+2;
                }
                document.querySelector("#score").textContent = score;
                document.querySelector("#streak_score").textContent = streak_score;
                changeColors(clickedColor);
                victoryBlink();
                setTimeout(reset, 2000);
                lose = 0;
                timeleft = 13;
            }
            else {
                message.textContent = "WRONG! TRY AGAIN."
                this.style.backgroundColor = "#232323";
                this.style.borderColor = "#232323";
                streak_score = 0;
                document.querySelector("#streak_score").textContent = streak_score;
                lose = lose + 1;
                if (numTiles==3 && lose>=2){
                    message.textContent = "You lost this round :("
                    lose = 0;
                    victoryBlink();
                    setTimeout(reset, 1000);
                }else{
                    if(lose>=3){
                    message.textContent = "You lost this round :("
                    lose = 0;
                    victoryBlink();
                    setTimeout(reset, 2000);
                    }
                }
                timeleft = 13;
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


var downloadTimer = setInterval(function(){
  document.getElementById("countdown").innerHTML = timeleft-3 + " seconds remaining";
  timeleft -= 1;
  if(timeleft < 3){
    document.getElementById("countdown").innerHTML = "Finished !"
    if (numTiles==3){
        message.textContent = "You lost this round :("
        lose = 0;
        streak_score = 0;
        victoryBlink();
        setTimeout(reset, 1000);
    }else{
        message.textContent = "You lost this round :("
        lose = 0;
        streak_score = 0;
        victoryBlink();
        setTimeout(reset, 2000);
    }
    timeleft = 13;
}
if(timeleft<0){
    clearInterval(downloadTimer);
}
}, 1000);

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