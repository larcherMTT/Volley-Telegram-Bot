var court_canvas   = document.getElementById('Court');
var court_ctx      = court_canvas.getContext('2d');
var players_canvas = document.getElementById('Players');
var players_ctx    = players_canvas.getContext('2d');

var active_obj     = 'none';

let mouse = {
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

    drawPlayer('http://overcastle.ddns.net:3000/', 'P1');
    drawPlayer('http://overcastle.ddns.net:3000/', 'P2');
    drawPlayer('http://overcastle.ddns.net:3000/', 'P3');
    drawPlayer('http://overcastle.ddns.net:3000/', 'P4');
    drawPlayer('http://overcastle.ddns.net:3000/', 'P5');
    drawPlayer('http://overcastle.ddns.net:3000/', 'P6');
    drawPlayer('http://overcastle.ddns.net:3000/', 'B1');
    drawPlayer('http://overcastle.ddns.net:3000/', 'B2');
    drawPlayer('http://overcastle.ddns.net:3000/', 'B3');
    drawPlayer('http://overcastle.ddns.net:3000/', 'B4');
    drawPlayer('http://overcastle.ddns.net:3000/', 'B5');

    drawPlayer('http://overcastle.ddns.net:3000/', 'p1');
    drawPlayer('http://overcastle.ddns.net:3000/', 'p2');
    drawPlayer('http://overcastle.ddns.net:3000/', 'p3');
    drawPlayer('http://overcastle.ddns.net:3000/', 'p4');
    drawPlayer('http://overcastle.ddns.net:3000/', 'p5');
    drawPlayer('http://overcastle.ddns.net:3000/', 'p6');
    drawPlayer('http://overcastle.ddns.net:3000/', 'b1');
    drawPlayer('http://overcastle.ddns.net:3000/', 'b2');
    drawPlayer('http://overcastle.ddns.net:3000/', 'b3');
    drawPlayer('http://overcastle.ddns.net:3000/', 'b4');
    drawPlayer('http://overcastle.ddns.net:3000/', 'b5');

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

    var img = new Image();
    img.id = position + "_player" + "_img";
    img.onload = function() { 
        players_ctx.drawImage(img, player_pos_x - player_size/2, player_pos_y - player_size/2, player_size, player_size);
    }

    img.src = img_src;
   
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}
