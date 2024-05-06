let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector("main");

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

//Populates the maze in the HTML
for (let y of maze) {
  for (let x of y) {
    let block = document.createElement("div");
    block.classList.add("block");

    switch (x) {
      case 1:
        block.classList.add("wall");
        break;
      case 2:
        block.id = "player";
        let mouth = document.createElement("div");
        mouth.classList.add("mouth");
        block.appendChild(mouth);
        break;
      case 3:
        block.classList.add("enemy");
        break;
      default:
        block.classList.add("point");
        block.style.height = "1vh";
        block.style.width = "1vh";
    }

    main.appendChild(block);
  }
}

//Player movement
function keyUp(event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  } else if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  }
}

function keyDown(event) {
  if (event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  } else if (event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "ArrowRight") {
    rightPressed = true;
  }
}

const player = document.querySelector("#player");
const playerMouth = player.querySelector(".mouth");
let playerTop = 0;
let playerLeft = 0;


function moveplayer() {

  let position = player.getBoundingClientRect();




  if (downPressed ==true) {
    
    let newBottom = position.bottom + 1;
    let btmL = document.elementFromPoint(position.left, newBottom);
    let btmR = document.elementFromPoint(position.right, newBottom);
  
    if (btmL.classList.contains('block') == false && btmR.classList.contains("block") == false ) {
      playerTop++;
      player.style.top = playerTop + "px";
    }

    playerMouth.classList = "down";
  } 
  
  if (upPressed  == true) {
  
    let newTop = position.top - 1;
    let topL = document.elementFromPoint(position.left, newTop);
    let topR = document.elementFromPoint(position.left, newTop);

    if(topL.classList.contains('block') == false && topR.classList.contains('block') == false){
      playerTop--;
      player.style.top = playerTop + "px";
    }
   
    playerMouth.classList = "up";

  } 
  
  
  
  if (leftPressed == true) {

  
    let newlft = position.left - 1;
    let leftTop = document.elementFromPoint(newlft, position.top);
    let leftBot = document.elementFromPoint(newlft, position.bottom)


    if(leftTop.classList.contains('block')== false && leftBot.classList.contains('block') == false){
      playerLeft--;
      player.style.left = playerLeft + "px";
    }
     
    
    playerMouth.classList = "left";
  } 
  
  
   if (rightPressed == true) {



    let position = player.getBoundingClientRect();
    let newrght = position.right + 1;
    let rightTop = document.elementFromPoint(newrght,position.bottom);
    let rightBot = document.elementFromPoint( newrght, position.bottom )


    if(rightTop.classList.contains('block')== false && rightBot.classList.contains('block') == false){
      playerLeft++;
      player.style.left = playerLeft + "px";
    }
   
    playerMouth.classList = "right";
  }
pointCheck();
checkenemy();


  
}


setInterval(moveplayer, 5)












//for points collision 
let score = 0;

function pointCheck() {

  const  points = document.querySelectorAll('.point');
  let  position = player.getBoundingClientRect();
  
  for (let i = 0; i < points.length; i++) {
  let pointPosition = points[i].getBoundingClientRect();
  if (position.right > pointPosition.left &&
    position.left < pointPosition.right&&
    position.bottom > pointPosition.top &&
    position.top  < pointPosition.bottom

  ){
  points[i].classList.remove('point');
  score++;

  document.querySelector('#score').textContent = score
  
}

}

}


// to stop player movement when its game over
function StopkeyUp(event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  } else if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  }
}

function StopkeyDown(event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  } else if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  }
}



let enemy = document.querySelector('.enemy');
function checkenemy(){

  if (isGameOver) return; // Don't move player if game over
  const enemyPosition = enemy.getBoundingClientRect();
  const playerPosition = player.getBoundingClientRect();

  if (playerPosition.right > enemyPosition.left &&
    playerPosition.left < enemyPosition.right &&
    playerPosition.bottom > enemyPosition.top &&
    playerPosition.top < enemyPosition.bottom
  ){
    gameOver();

    document.addEventListener("keydown", StopkeyDown);
    document.addEventListener("keyup", StopkeyUp);
  }



}

let isGameOver = false;
function gameOver() {
  isGameOver = true;
  // Implement game over actions here, such as displaying a message or resetting the game
  endGame.style.display = 'flex';



  // Optionally, you can reload the page or reset the game state to restart the game

  setTimeout(() => {
    resetGame();
    // Reset game over flag
    isGameOver = false;
}, 100); // Restart after 2 seconds




}


function resetGame() {
  // Reset player position
  playerTop = -0;
  playerLeft = -0;
  player.style.top = playerTop + "px";
  player.style.left = playerLeft + "px";

  // Restore all points in the maze
  const points = document.querySelectorAll(".point");
  points.forEach((point) => point.classList.add("point"));

  // Reset score

}


function gameDown(){
  alert('please refresh page ')
}
  



// Call the moveEnemy function at regular intervals
// Adjust the interval as needed (e.g., every second)






/*
//for button
let upbtn = document.getElementById("ubttn");
let dobtn = document.getElementById("dbttn");
let lbtn = document.getElementById("lbttn");
let rbtn = document.getElementById("rbttn");

let playerme = document.querySelector("#player");
let playerMouthme = player.querySelector(".mouth");

let playerTop1 = 0;
let playerLeft2 = 0;

let intervalId;
let direction = null;
/*
function movePlayer() {

  let newTop = playerTop;
  let newLeft = playerLeft;

  if (direction == "up") {
    newTop--;
    playerme.style.top = newTop + "px";
    playerMouthme.classList = "up";

  } else if (direction == "down") {
    playerTop1++;
    playerme.style.top = playerTop1 + "px";
    playerMouthme.classList = "down";
 
  } else if (direction == "left") {
    playerLeft2--;
    playerme.style.left = playerLeft2 + "px";
    playerMouthme.classList = "left";

  } else if (direction == "right") {
    playerLeft2++;
    playerme.style.left = playerLeft2 + "px";
    playerMouthme.classList = "right";
 
  }





}
*/
/*
function isCollision(newTop, newLeft) {
  let block = maze[newTop][newLeft];
  return block === 1;
}
*/
let start = document.querySelector("#starthere");


 let endGame = document.querySelector('#gameover');
 endGame.style.display = 'none'



 



function startbutton() {
  
  start.style.display = "none";

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);




/*
  upbtn.addEventListener("mousedown", () => (direction = "up"));
  dobtn.addEventListener("mousedown", () => (direction = "down"));
  lbtn.addEventListener("mousedown", () => (direction = "left"));
  rbtn.addEventListener("mousedown", () => (direction = "right"));

  document.addEventListener("mouseup", () => {
    clearInterval(intervalId);
    direction = null;
  });

  document.addEventListener("mousedown", () => {
    if (direction !== null) {
      intervalId = setInterval(movePlayer, 10);
    }
  });

  */

  
}

start.addEventListener("click", startbutton);








//document.addEventListener("keyup", keyUp);
//document.addEventListener('keydown', keyDown)












