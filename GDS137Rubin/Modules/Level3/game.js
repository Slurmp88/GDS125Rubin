canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');

interval = 1000/60;

timer = setInterval(animate, interval);

var y = canvas.height/2;
var x = canvas.width/2;

var down = false;
var up = false;
var right = false;
var left = false;
var img = document.getElementById("cage");
var p1Wins = 0;
var p2Wins = 0;

var keys=[];

function randRange(High, Low){
    return Math.random() * (High - Low) + Low;
}

//keyboard Event Listeners
document.addEventListener("keydown",function(e)
{
    keys[String.fromCharCode(e.keyCode)] = true;
})
document.addEventListener("keyup",function(e)
{
    keys[String.fromCharCode(e.keyCode)] = false;
})

//create GameObject;
charecter = new GameObject();
charecter.x = 20;
charecter.y = canvas.height/2;
charecter.width = 20;
charecter.height = 150;

//create 2nd GameObject;
charecter2 = new GameObject();
charecter2.x = canvas.width - 20;
charecter2.y = canvas.height/2;
charecter2.width = 20;
charecter2.height = 150;
charecter2.color = "red";

//create ball;
ball = new GameObject();
ball.height = 60;
ball.width = 60;
ball.x = canvas.width/2;
ball.y = canvas.height/2;
ball.vx = 5;
ball.vy = 0;
ball.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;

//Main func/ animate game objects. 
function animate()
{
    //movement
    if(keys['W']){
        charecter.vy = -10;
    }
    else if(keys['S'])
    {
        charecter.vy = 10;
    }
    else
    {
        charecter.vy = 0;
    }
    charecter.move();
    if(charecter.y < charecter.height / 2)
    {
        charecter.y = charecter.height / 2;
        charecter.vy = 0;
    }
    if(charecter.y > canvas.height - charecter.height / 2)
    {
        charecter.y = canvas.height - charecter.height / 2;
        charecter.vy = 0;
    }

    //movement 2
    if(keys['&']){
        charecter2.vy = -10;
    }
    else if(keys['('])
    {
        charecter2.vy = 10;
    }
    else
    {
        charecter2.vy = 0;
    }
    charecter2.move();
    if(charecter2.y < charecter2.height / 2)
    {
        charecter2.y = charecter2.height / 2;
        charecter.vy = 0;
    }
    if(charecter2.y > canvas.height - charecter2.height / 2)
    {
        charecter2.y = canvas.height - charecter2.height / 2;
        charecter2.vy = 0;
    }

    //Detection

    //Move the charecter

    ball.move();
    if(charecter.hitTestObject(ball))
    {
        ball.x = charecter.x + charecter.width/2 + ball.width/2;
        if(ball.y < charecter.y - charecter.width/6)
        {
            ball.vx = -ball.vx;
            ball.vy = -5 ;
        }
        else if(ball.y > charecter.y + charecter.width/6)
        {
            ball.vx = -ball.vx;
            ball.vy = 5;
        }
        else
        {
            ball.vx = -ball.vx; 
        }
    } 

    if(charecter2.hitTestObject(ball))
    {
        ball.x = charecter2.x - charecter2.width/2 - ball.width/2;
        if(ball.y < charecter2.y - charecter2.width/6)
        {
            ball.vx = -ball.vx;
            ball.vy = -5 ;
        }
        else if(ball.y > charecter2.y + charecter2.width/6)
        {
            ball.vx = -ball.vx;
            ball.vy = 5;
        }
        else
        {
            ball.vx = -ball.vx; 
        }
    } 

    //Up
    if(ball.y < ball.height/2)
    {
        ball.vy = -ball.vy;
        ball.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
    }
    //Down
    if(ball.y > canvas.height - ball.height/2)
    {
        ball.vy = -ball.vy;
        ball.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
    }
    //Left
    if(ball.x < ball.height/2)
    {
        ball.x = canvas.width /2;
        p2Wins++;
        text = "Player 1 Wins = "
        ball.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
    }
    //Right
    if(ball.x > canvas.width + ball.height/2)
    {
        p1Wins++;
        ball.x = canvas.width / 2;
        ball.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.save();
    ctx.strokeStyle = "yellow"
    ctx.beginPath();
    ctx.moveTo((canvas.width/2), 0)
    ctx.lineTo((canvas.width/2), canvas.height)
    ctx.closePath()
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();

    charecter.drawBox();
    charecter2.drawBox();
    //ball.drawCircle();
    ctx.drawImage(img, ball.x - ball.width + 19, ball.y - ball.height + 29, 80, 67);

    ctx.save();
    ctx.font = "30px Arial"
    ctx.fillStyle = "black"
    ctx.textAlign = "center";
    ctx.fillText("Player 1 || Player 2", (canvas.width/2), 30);
    ctx.fillText(p1Wins + " || " + p2Wins, (canvas.width/2), 60);
    ctx.restore();


}