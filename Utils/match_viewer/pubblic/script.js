var court_canvas   = document.getElementById('Court');
var court_ctx      = court_canvas.getContext('2d');
var players_canvas = document.getElementById('Players');
var players_ctx    = players_canvas.getContext('2d');

var active_obj     = 'none';

var mouse = {
    dragging: false,
    x: 0,
    y: 0
}

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();


/*--------------------------------------------*/
// FUNCTIONS
/*--------------------------------------------*/

async function resizeCanvas() {
    court_canvas.width = window.innerWidth;
    court_canvas.height = 1.85*court_canvas.width;
    players_canvas.width = court_canvas.width;
    players_canvas.height = court_canvas.height;

    drawAll(); 
}

async function drawAll() {
    var c_width = court_canvas.width;
    var c_height = court_canvas.height;

    drawCourt();
    drawBall();

    drawPlayer('http://localhost:3000/', 'P1');
    drawPlayer('http://localhost:3000/', 'P2');
    drawPlayer('http://localhost:3000/', 'P3');
    drawPlayer('http://localhost:3000/', 'P4');
    drawPlayer('http://localhost:3000/', 'P5');
    drawPlayer('http://localhost:3000/', 'P6');
    drawPlayer('http://localhost:3000/', 'B1');
    drawPlayer('http://localhost:3000/', 'B2');
    drawPlayer('http://localhost:3000/', 'B3');
    drawPlayer('http://localhost:3000/', 'B4');
    drawPlayer('http://localhost:3000/', 'B5');

    drawPlayer('http://localhost:3000/', 'p1');
    drawPlayer('http://localhost:3000/', 'p2');
    drawPlayer('http://localhost:3000/', 'p3');
    drawPlayer('http://localhost:3000/', 'p4');
    drawPlayer('http://localhost:3000/', 'p5');
    drawPlayer('http://localhost:3000/', 'p6');
    drawPlayer('http://localhost:3000/', 'b1');
    drawPlayer('http://localhost:3000/', 'b2');
    drawPlayer('http://localhost:3000/', 'b3');
    drawPlayer('http://localhost:3000/', 'b4');
    drawPlayer('http://localhost:3000/', 'b5');

}

async function drawCourt() {
    var c_width = court_canvas.width;
    var c_height = court_canvas.height;

    var court_img = new Image();
    court_img.id = "court_img";

    court_img.onload = function() {
        court_ctx.drawImage(court_img, 0, 0, c_width, c_height);
    }
    court_img.src = '../images/court.svg';
}

async function drawBall() {
    var c_width = court_canvas.width;
    var c_height = court_canvas.height;
    var ball_size = 0.08*c_width;

    var ball_img = new Image();
    ball_img.id = "ball_img";

    ball_img.onload = function() {
        players_ctx.drawImage(ball_img, c_width/2 - ball_size/2, c_height/2 - ball_size/2, ball_size, ball_size);
    }
    ball_img.src = '../images/ball.svg';
}

async function drawPlayer(img_src, position) {
    var c_width = court_canvas.width;
    var c_height = court_canvas.height;
    var player_size = 0.18*c_width;
    let player_pos_x = 0;
    let player_pos_y = 0;
    var player = [];

    class Player {
        constructor(img_src, position, x, y, size, ctx) {
            this.img_src = img_src;
            this.position = position;
            this.size = size;
            this.x = x;
            this.y = y;
            this.ctx = ctx;
        }

        draw() {
            var img = new Image();
            img.id = position + "_player" + "_img";
            console.log(img);
            this.ctx.drawImage(img, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            console.log('drawed' + this.position);
            img.src = this.img_src;
        }

        //update() {
        //    if (mouse.dragging) {
        //        this.x = mouse.x;
        //        this.y = mouse.y;
        //    }
        //    this.draw();
        //}

    }

    function init() {
        switch(position.toUpperCase()) {
            case "P1":  player_pos_x = 1*c_width/4;
                        player_pos_y = 1*c_height/5;
                        break;
            case "P2":  player_pos_x = 1*c_width/4;
                        player_pos_y = 2*c_height/5;
                        break;
            case "P3":  player_pos_x = 2*c_width/4;
                        player_pos_y = 2*c_height/5;
                        break;
            case "P4":  player_pos_x = 3*c_width/4;
                        player_pos_y = 2*c_height/5;
                        break;
            case "P5":  player_pos_x = 3*c_width/4;
                        player_pos_y = 1*c_height/5;
                        break;
            case "P6":  player_pos_x = 2*c_width/4;
                        player_pos_y = 1*c_height/5;
                        break;
            case "B1":  player_pos_x = 1*c_width/6;
                        player_pos_y = 0.05*c_height;
                        break;
            case "B2":  player_pos_x = 2*c_width/6;
                        player_pos_y = 0.05*c_height;
                        break;
            case "B3":  player_pos_x = 3*c_width/6;
                        player_pos_y = 0.05*c_height;
                        break;
            case "B4":  player_pos_x = 4*c_width/6; 
                        player_pos_y = 0.05*c_height;
                        break;  
            case "B5":  player_pos_x = 5*c_width/6;
                        player_pos_y = 0.05*c_height;
                        break;
        }

        // check player side
        if (isUpperCase(position.charAt(0))) { 
            player_pos_y = c_height - player_pos_y;
            player_pos_x = c_width - player_pos_x;
        }

        player = new Player(img_src, position, player_pos_x, player_pos_y, player_size, players_ctx);
        console.log(player)
        player.draw();
    }

    function animate() {
        requestAnimationFrame(animate);
        player.update();
    }

    init();
    //animate();
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}

function startTouch(e){
    //this makes it easier to write control flow later and keeps XY relative to canvas
    var xTouch=e.touches[0].pageX-c.offsetLeft,
        yTouch=e.touches[0].pageY-c.offsetTop;

    //its best to go through this loop in touchstart, because it only happens once per touch
    players_canvas.forEachObject(function(obj){
        if(obj.isTouchInside(xTouch,yTouch)){
            //this is the object that was touched
            active_obj=obj;
        }
    });
  }

  function moveTouch(e){
    //grab a box by the center
    if(active_obj!='none'){
        active_obj.x=e.changedTouches[0].pageX-box[activeBox].width/2;
        active_obj.y=e.changedTouches[0].pageY-box[activeBox].height/2;
    }
  }

  function endTouch(){
    //clear active so that dragging empty space wont move the last active box
    active_obj='none';
  }

  //------------------------------------------------   
  var offsetX = 0;
  var offsetY = 0;
  
  function handleMouseDown(e){
        mouse.x=parseInt(e.clientX-offsetX);
        mouse.y=parseInt(e.clientY-offsetY);
        // set the drag flag
        mouse.dragging=true;
    }

    function handleMouseUp(e){
        mouse.x=parseInt(e.clientX-offsetX);
        mouse.y=parseInt(e.clientY-offsetY);
        // clear the drag flag
        mouse.dragging=false;
    }

    function handleMouseOut(e){
        mouse.x=parseInt(e.clientX-offsetX);
        mouse.y=parseInt(e.clientY-offsetY);
        // user has left the canvas, so clear the drag flag
        //isDragging=false;
    }

    function handleMouseMove(e){
        mouse.x=parseInt(e.clientX-offsetX);
        mouse.y=parseInt(e.clientY-offsetY);
        // if the drag flag is set, clear the canvas and draw the image
        if(mouse.dragging){
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            ctx.drawImage(img,mouse.x-128/2,mouse.y-120/2,128,120);
        }
    }

