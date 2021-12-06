canvas = document.getElementById("canvas");
context = canvas.getContext('2d');

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
var gravity = 4;
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
charecter.y = canvas.height - 25;
charecter.width = 50;
charecter.height = 50;
charecter.color = "cyan"

var spawnNumber = 5;
var reds = [];
var greens = [];


for(var i = 0; i < spawnNumber; i++)
{
    reds[i] = new GameObject({x: 0, y: canvas.height + 100, color: "red", width: 20, height: 20, radius: 10, vy: randRange(3,5)})
    greens[i] = new GameObject({x: 0, y: canvas.height + 100, color: "green", width: 20, height: 20,  vy: randRange(3,5)})
}

var change;
var change2;
var time;
var delay = 500;

//Main func/ animate game objects. 
function animate()
{

    context.clearRect(0,0, canvas.width, canvas.height);
    charecter.color = "cyan";
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
    for(var i = 0; i < spawnNumber; i++)
    {
        reds[i].y += reds[i].vy;
        greens[i].y += greens[i].vy;
        reds[i].drawCircle();
        greens[i].drawRect();
        if(reds[i].y > canvas.height + 50)
        {
            reds[i].y = randRange(-50, -400);
            reds[i].x = randRange(canvas.width, 0);
        }
        if(greens[i].y > canvas.height + 50)
        {
            greens[i].y = randRange(-50, -400);
            greens[i].x = randRange(canvas.width, 0);
        }

        if(charecter.hitTestObject(greens[i]))
        {
            change2 = false;
            score++;
            greens[i].y = 1000;
            clearTimeout(time)
			time = setTimeout(set2, delay)
        }
        
        if(charecter.hitTestObject(reds[i]))
        {
            for(var i = 0; i < spawnNumber; i++)
            {
                reds[i] = new GameObject({x: 0, y: canvas.height + 100, color: "red", width: 20, height: 20, radius: 10, vy: randRange(3,5)})
                greens[i] = new GameObject({x: 0, y: canvas.height + 100, color: "green", width: 20, height: 20,  vy: randRange(3,5)})
            }
            change = false;
            score = 0;
            clearTimeout(time)
			time = setTimeout(set, delay)
        }

        if(change == false)
        {
            charecter.color = "red";
        }

        if(change2 == false)
        {
            charecter.color = "green";
        }
    }

    context.save();
    context.font = "16px Arial"
    context.fillStyle = "black"
    context.textAlign = "center";
    context.fillText("Score: " + score, 80, 25);
    context.restore();
    charecter.drawRect();
}

function set()
{
    change = true;
}
function set2()
{
    change2 = true;
}