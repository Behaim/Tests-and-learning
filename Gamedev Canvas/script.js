 let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let x = canvas.width/2;
  let y = canvas.height-30;
  let dx = 2;
  let dy = -2;
  let ballRadius = 10;
  let color = randColor();
  let paddleHeight = 7;
  let paddleWidth = 100;
  let paddleX = (canvas.width-paddleWidth)/2;
  let rightPressed = false;
  let leftPressed = false;
  

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

  function draw() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
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
          color = randColor();
          dy = -dy - 0.1;
        }
        else {
          alert("GAME OVER");
          document.location.reload();
        }
      }
      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
      }
      else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

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

  let interval = setInterval(draw, 10);