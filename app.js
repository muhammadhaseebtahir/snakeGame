const board = document.querySelector(".board");
const select = document.querySelector(".select")
const startButton = document.querySelector(".btn-start")
const modal = document.querySelector(".modal")
const startGameModal = document.querySelector(".game-start")
const gameOverModal = document.querySelector(".game-over")
const reStartBtn= document.querySelector(".btn-restart")
const highScore = document.querySelector("#high-score")
const score= document.querySelector("#score")
const time = document.querySelector("#time")

let initialTime= `00-00`
let initialScore= 0
let _highScore=JSON.parse(localStorage.getItem("highScore")) || 0
   highScore.innerText= _highScore
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let speedSnake= 300
const blocks = [];
let intervalId = null;
let direction = "right";
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
let snake = [
  {
    x: 3,
    y: 3,
  },
  {
    x: 3,
    y: 4,
  },
  
];

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}



// select.addEventListener("change",(e)=>{
//     e.preventDefault()
//     speedSnake= e.target.value
//     JSON.stringify( localStorage.setItem("snakeSpeed",speedSnake))
//     console.log("speedSnake",speedSnake);
    
// })

const render = () => {
    let head = null;

  
  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
  
    modal.style.display="flex"
    startGameModal.style.display="none"
    gameOverModal.style.display="flex"
    clearInterval(intervalId);
    return
  }
  snake.forEach((s) => {
    blocks[`${s.x}-${s.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();


  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head)
     initialScore += 10
     score.innerText= initialScore
     if(initialScore>_highScore ){
        _highScore= initialScore
        localStorage.setItem("highScore",_highScore.toString())
     }
  }

//   ***Render Snake ***
     snake.forEach((s) => {
    blocks[`${s.x}-${s.y}`].classList.add("fill");
  });
 
};



startButton.addEventListener("click", () => {
    modal.style.display = "none"; 
    
    intervalId = setInterval(() => {
        render();
    }, 300);
});

reStartBtn.addEventListener("click",()=>{
   modal.style.display="none"
   blocks[`${food.x}-${food.y}`].classList.remove("food")
   snake.forEach(s=>{
    blocks[`${s.x}-${s.y}`].classList.remove("fill")
   })
   initialScore= 0
    snake = [
  {
    x: 3,
    y: 3,
  },
  {
    x: 3,
    y: 4,
  },
  
];

food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
 intervalId = setInterval(() => {
        render();
    }, 300);

})





document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    direction = "up";
  } else if (e.key == "ArrowRight") {
    direction = "right";
  } else if (e.key == "ArrowLeft") {
    direction = "left";
  } else if (e.key == "ArrowDown") {
    direction = "down";
  }
});
