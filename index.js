
//Global variables
var buttonColour = ["red","blue","green","yellow"];
var gamePattern;
var userClickedPattern;
var level;
var counter;

//Reset function, goes back to the start, sets GV
function reset () {
  gamePattern = [];
  userClickedPattern = [];
  level = -1;
  counter = -1;
  $("h1").text("Press A Key to Start");
}

//Starts the game
$(document).keydown(function(e) {
  reset();
  level=0;
  $("h1").text("Level " + level);
  nextSequence();
});

//Randomly selects a color and pushes it to a list
function nextSequence() {
  var colour = buttonColour[Math.floor(Math.random()*4)];
  gamePattern.push(colour);
  $("#"+colour).fadeOut(250).fadeIn(250);
  playSound(colour);
}

//Event listener for buttons
$(".btn").click(function (e) {
  var userChosenColour = (e.target.id);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(level!=-1){ //Makes sure game doesn't work in the begginig
    counter++;
    userClickedPattern.push(userChosenColour);
    checkAnswer();
  }
  else {
    $("h1").fadeOut(100).fadeIn(100);
  }
});


function checkAnswer () {
  if (userClickedPattern[counter]==gamePattern[counter]) {
    if(counter==level) {
      level++;
      $("h1").text("Level " + level);
      counter=-1;
      userClickedPattern=[];
      window.setTimeout(nextSequence,1000);
    }
  }
  else {
    $("h1").text("Game over");
    playSound("wrong");
    window.setTimeout(reset,3000);
  }
}

//Sound and Animation

function playSound (colour) {
  var sound = new Audio("sounds/" + colour + ".mp3")
  sound.play();
}

function animatePress (colour) {
  $("#"+colour).addClass("pressed");
  window.setTimeout(
    function () {
      $("#"+colour).removeClass("pressed");
    },
    100);
}
