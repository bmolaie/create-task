
let canvas = document.getElementById('snakeGame');
let ctx = canvas.getContext('2d');
let box = 16;
let count = 0;

let snake = {
  x: 160,
  y: 160,
  dx: box,
  dy: 0,
  blocks: [],
  maxBlocks: 5
};

let food = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() *(max-min))+min;
}

function loop() {
  requestAnimationFrame(loop);
  if (++count < 4) {
    return;
  }

  count=0;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  snake.x+=snake.dx;
  snake.y+=snake.dy;
  if (snake.x < 0) {
    snake.x=canvas.width - box;
  }else if (snake.x>=canvas.width) {
    snake.x=0;
  }

  if (snake.y < 0) {
    snake.y=canvas.height-box;
  }else if (snake.y>=canvas.height) {
    snake.y = 0;
  }

  snake.blocks.unshift({x: snake.x, y: snake.y});
  if (snake.blocks.length > snake.maxBlocks) {
    snake.blocks.pop();
  }
  ctx.fillStyle='black';
  ctx.fillRect(food.x, food.y, box-1, box-1);
  ctx.fillStyle='white';
  snake.blocks.forEach(function(block, index) {
    ctx.fillRect(block.x, block.y, box-1, box-1);
    if (block.x===food.x && block.y===food.y) {
      snake.maxBlocks++;
      food.x=getRandomInt(0, 25)*box;
      food.y=getRandomInt(0, 25)*box;
    }
    for (let i=index+1; i < snake.blocks.length; i++) {
          if (block.x===snake.blocks[i].x && block.y===snake.blocks[i].y) {
        snake.x=160;
        snake.y=160;
        snake.blocks=[];
        snake.maxBlocks=4;
        snake.dx=box;
        snake.dy=0;
        food.x=getRandomInt(0, 25)*box;
        food.y=getRandomInt(0, 25)*box;
      }
    }
  });
}

document.addEventListener('keydown',function(event) {
  if (event.which===37 && snake.dx===0) {
    snake.dx=-box;
    snake.dy=0;
  }else if (event.which===38 && snake.dy===0) {
    snake.dy=-box;
    snake.dx=0;
  }else if (event.which===39 && snake.dx===0) {
    snake.dx=box;
    snake.dy=0;
  }else if (event.which===40 && snake.dy===0) {
    snake.dy=box;
    snake.dx=0;
  }
});
requestAnimationFrame(loop);


