var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColor;
var userClickedPattern = [];
var level = 0;
var started = false;

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    
          startOver();
    }   
}

$(document).keypress(function(){
    if(!started){
        $("level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level "+level);
    userClickedPattern=[];
}

$(".btn").click(function(){
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



