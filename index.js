/*Code ALONG*/
var myObstacles = []; //begin with no obstacles 

var myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
    alert('game over')
  },
};

class Component { //This will be used to craete/draw all the stuff.  Our red square, and all green rectangle obstacles 
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
    }
    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
    
      crashWith(obstacle) {
        return !(
          this.bottom() < obstacle.top() ||
          this.top() > obstacle.bottom() ||
          this.right() < obstacle.left() ||
          this.left() > obstacle.right()
        );
      }
    update() { //updates the x and y of each component( i.e. moves them ).
      var ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height); //Is the actual drawing
      //ctx.drawImage(img, this.x, this.y, 50, 50); 
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }    
  }



  function checkGameOver() {
    var crashed = myObstacles.some(function(obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (crashed) {
      myGameArea.stop();
    }
  }
  //function draw(ghost) {
    var img = new Image();
    img.onload = function() { 
       //ctx.drawImage(img, ghost.x, ghost.y, 50, 50); 
    }
    img.src = "https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif";
  //}
  
  var player = new Component(30, 30, "red", 0, 110);

  function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update(); //changes the x and y 
    updateObstacles(); //update the obstacles 
    checkGameOver();

  }


  setTimeout(function(){
      player.color = 'blue'
  },5000)


  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: // up arrow
        player.speedY -= 7;
        break;
      case 40: // down arrow
        player.speedY += 7;
        break;
      case 37: // left arrow
        player.speedX -= 7;
        break;
      case 39: // right arrow
        player.speedX += 7;
        break;
    }
  };

  document.onkeyup = function(e) {
    player.speedX = 0;
    player.speedY = 0;
  };


  let minG = 350; 
  let maxG = 500; 
  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) { //Updates each obstacle in the obstacle array 
        myObstacles[i].x += -5; // 
        myObstacles[i].update();
      }
    
    myGameArea.frames += 1;
    if (myGameArea.frames % 10 === 0) {
      var x = myGameArea.canvas.width;
      var minHeight = 20;
      var maxHeight = 200;
      var height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      var minGap = minG-=2;
      var maxGap = maxG-=2;

      console.log(minGap)
      var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      var obstacle = new Component(10, height, "green", x, 0); //this creates a new instacne of a component
      myObstacles.push(obstacle);  //adds it to the array 
      myObstacles.push(
        new Component(10, x - height - gap, "green", x, height + gap)
      );
    }
  }












/*PACMAN*/

// var canvas = document.createElement('canvas')
// let w = window.innerWidth;
// let h = window.innerHeight;
// canvas.width = w
// canvas.height = h
// document.body.appendChild(canvas)

// var ctx = canvas.getContext('2d');
// ctx.fillStyle = 'white';
// ctx.font = '18px serif';

// var ghost = {
//   x: 25,
//   y: 25,
//   moveUp:    function() { this.y -= 250 },
//   moveDown:  function() { this.y += 250 },
//   moveLeft:  function() { this.x -= 25 },
//   moveRight: function() { this.x += 25 },
// }

// function draw(ghost) {
//   var img = new Image();
//   img.onload = function() { 
//      ctx.drawImage(img, ghost.x, ghost.y, 50, 50); 
//   }
//   img.src = "https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif";
// }


// document.onkeydown = function(e) {
//   switch (e.keyCode) {
//     case 38: ghost.moveUp();    console.log('up',    ghost); break;
//     case 40: ghost.moveDown();  console.log('down',  ghost); break;
//     case 37: ghost.moveLeft();  console.log('left',  ghost); break;
//     case 39: ghost.moveRight(); console.log('right', ghost); break;
//   }
//   updateCanvas();
// }

// function updateCanvas() {
//   ctx.clearRect(0,0,1500,1700);
//   ctx.fillText("Ghost_x: " + ghost.x, 580,40);
//   ctx.fillText("Ghost_y: " + ghost.y, 580,60);
//   draw(ghost)
// }

// updateCanvas()

/*** BASIC ANIMATION SQUARES 
//var canvas = document.getElementById('canvas');
var canvas = document.createElement('canvas')
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w
canvas.height = h
document.body.appendChild(canvas)


var ctx = canvas.getContext('2d');

ctx.fillStyle = "#FF0000";
var y1 = 0;
var y2 = 0;
var y3 = 0;
var x1 = 0;
function clearCanvas() {
  ctx.clearRect(0,0,w,h);
}

let i; 

function updateCanvas(){
  ctx.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16)
  y1 += 1;
  y2 += 2;
  y3 += 3;
  x1 += 10;
  clearCanvas();
  ctx.fillRect( x1,y1,50,50);
  ctx.fillRect(150,y2,50,50);
  ctx.fillRect(250,y3,50,50);  
  i = window.requestAnimationFrame(updateCanvas);
}


window.requestAnimationFrame(updateCanvas);




/***BASIC STUFF */
// ctx.fillStyle="purple";
// ctx.strokeRect(50, 50, 50, 50);
// ctx.fillRect(160, 60, 200, 300);
// ctx.clearRect(0,0,w,h);

// ctx.arc(150, 170, 75, 0, Math.PI * 2);
// ctx.fillStyle = "red"; // !
//     // fills the inner circle with red color
// ctx.fill();


// ctx.font = '48px serif';
// ctx.fillText('Hello world', 10, 50);
// ctx.font = '48px serif';
// ctx.strokeText('Hello world', 10, 100);
// var img = new Image();
// imgScale = 640/480;
// img.onload = function() {
//     ctx.drawImage(img, 200, 200,150*imgScale,150);
// };
// img.src = 'https://static.pexels.com/photos/8700/wall-animal-dog-pet.jpg';