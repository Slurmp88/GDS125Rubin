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

var keys=[];

//keyboard Event Listeners
document.addEventListener("keydown",function(e)
{
    keys[String.fromCharCode(e.keyCode)] = true;
})
document.addEventListener("keyup",function(e)
{
    keys[String.fromCharCode(e.keyCode)] = false;
})

//create player;
charecter = new player();
charecter.x = 20;
charecter.y = canvas.height/2;
charecter.width = 10;
charecter.height = 50;

function animate()
{
    console.log(canvas.height)
    if(keys['W']){
        charecter.vy = -5;
    }
    else if(keys['S'])
    {
        charecter.vy = 5;
    }
    else
    {
        charecter.vy = 0;
    }
    charecter.move();
    if(charecter.y < charecter.height / 2)
    {
        charecter.y =charecter.height / 2;
        charecter.vy = 0;
    }
    if(charecter.y > canvas.height - charecter.height / 2)
    {
        charecter.y = canvas.height - charecter.height / 2;
        charecter.vy = 0;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);
    charecter.drawBox();
}