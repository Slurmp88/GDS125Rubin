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
var score = 0;
var frictionX = .99;	
var frictionY = .97;
var gravity = 1;
var highScore = 0;
var force;

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
charecter.x = canvas.width/2;
charecter.y = canvas.height - 20;
charecter.width = 250;
charecter.height = 40;
charecter.color = "cyan"

//create ball;
ball = new GameObject();
ball.height = 80;
ball.width = 80;
ball.x = canvas.width/2;
ball.y = canvas.height/2;
ball.vx = 0;
ball.vy = 5;
ball.color = "magenta";

//Main func/ animate game objects. 
function animate()
{
    //movement
    if(keys['A']){
        charecter.vx = -15;
    }
    else if(keys['D'])
    {
        charecter.vx = 15;
    }
    else
    {
        charecter.vx = 0;
    }
    charecter.move();
    if(charecter.x < charecter.width / 2)
    {
        charecter.x = charecter.width / 2;
        charecter.vx = 0;
    }
    if(charecter.x > canvas.width - charecter.width / 2)
    {
        charecter.x = canvas.width - charecter.width / 2;
        charecter.vx = 0;
    }

    //Move the charecter
	ball.vy *= frictionY;
    ball.vx *= frictionX;
	ball.vy += gravity;
    ball.move();
    if(charecter.hitTestObject(ball))
    {
        ball.y = charecter.y - charecter.height/2 - ball.height/2;
        if(ball.x < charecter.x - charecter.width/6)
        {
            ball.vx = -ball.force;
        }
        if(ball.x > charecter.x + charecter.width/6)
        {
            ball.vx = ball.force;
        }
        if(ball.x < charecter.x - charecter.width/3)
        {
            ball.vx = -(ball.force * 5);
        }
        if(ball.x > charecter.x + charecter.width/3)
        {
            ball.vx = (ball.force * 5);
        }
        console.log(ball.vx)
        score++;
        ball.vy = -35;
    } 
	
	if(score > highScore)
    {
        highScore = score;
    }

    //Up
    if(ball.y < ball.height/2 + ball.height/2)
    {
        ball.vy = -ball.vy;
    }
    //Down
    if(ball.y > canvas.height - ball.height/2)
    {
        ball.y = canvas.height - ball.height/2
        ball.vy = -ball.vy;
        ball.vy *= .67;
        score = 0;
    }
    //Left
    if(ball.x < ball.height/2)
    {
        ball.vx = -ball.vx;
        ball.x = ball.height/2;
    }
    //Right
    if(ball.x > canvas.width - ball.height/2)
    {
        ball.vx = -ball.vx;
        ball.x = canvas.width - ball.height/2;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);

    /*ctx.save();
    ctx.strokeStyle = "yellow"
    ctx.beginPath();
    ctx.moveTo((canvas.width/2), 0)
    ctx.lineTo((canvas.width/2), canvas.height)
    ctx.closePath()
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();*/

    ctx.save()
    ctx.beginPath();
    ctx.moveTo(charecter.x, charecter.y);
    ctx.lineTo(ball.x, ball.y);
    ctx.stroke();
    ctx.restore();

    charecter.drawBox();
    ball.drawCircle();

    ctx.save();
    ctx.font = "16px Arial"
    ctx.fillStyle = "black"
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, 80, 25);
    ctx.restore();


}