  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let x = canvas.width/2;
  let y = canvas.height-30;
  let dx = 3;
  let dy = -3;
  let ballRadius = 10;
  let color = randColor();
  let paddleHeight = 7;
  let paddleWidth = 100;
  let paddleX = (canvas.width-paddleWidth)/2;
  let rightPressed = false;
  let leftPressed = false;
  let brickRowCount = 3;
  let brickColumnCount = 7;
  let brickWidth = 52;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let score = 0;
  let lives = 2;

  let bricks = [];
    for(let c=0; c<brickColumnCount; c++) {
      bricks[c] = [];

      for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
  }

  function randColor() {
    let r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
  }
  
  function drawBall() {

      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
  }  

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = randColor();
                ctx.fill();
                ctx.closePath();
            }
        }
    }
  }



  function draw() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();
      x += dx;
      y += dy;
      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        // color = randColor();
        dx = -dx;
      }
      if(y + dy < ballRadius) {
        // color = randColor();
        dy = -dy;
      } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
          // color = randColor();
          dy = -dy - 0.3;
        }
        else {
          lives--;
          if(!lives) {           
            alert("GAME OVER");
            document.location.reload();
          } else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width-paddleWidth)/2;
          } 
            
        }
      }
      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
      }
      else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
      requestAnimationFrame(draw);
  }



  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
  }

  function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
  }

  function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    color = randColor();
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!" +"\n               Score " + score);
                        document.location.reload();
                       
                    }
                }
            }
        }
    }
  }

  function drawScore() {

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

draw();
