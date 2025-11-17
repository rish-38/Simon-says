let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;

let level = 0;

$(document).keydown(function (event) {
  if (event.key == 'a' || event.key == 'A') {
    if (!started) {
      nextSequence();
      started = true;
    }
  }
});

$('.btn').click(function () {
  var buttonPresed = $(this).attr('id');
  console.log(buttonPresed);
  userClickedPattern.push(buttonPresed);
  animatePress(buttonPresed);
  playSound(buttonPresed);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
  level++;
  $('#level-title').text('level ' + level);
  userClickedPattern = [];
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log(gamePattern);


};


function playSound(name) {
  let music = new Audio('./sounds/' + name + ".mp3");
  music.play();
}
function animatePress(currentColor) {
  // $("#" + currentColor).remove(".pressed");
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}


function startOver(){
  level = [];
  gamePattern = [];
  started = false;
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
  else {

    $('body').addClass("game-over");
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
  $('#level-title').text("Game Over, Press A key to Restart");

    startOver();
    playSound("wrong");
    console.log("wrong");
  }
}

