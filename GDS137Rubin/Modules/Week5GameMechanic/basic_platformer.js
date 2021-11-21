//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var canRope = true;
var ropeTimer;


canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");	

player = new GameObject({width:20, height:20, color:"blue"});


//This platform uses an object literal to define the properties
platform0 = new GameObject({width:1200, height:50, x:canvas.width/2, y:600, color:"green"});
platform1 = new GameObject({width:500, height:20, x:canvas.width/2, y:200, color:"green"})
point1 = new GameObject({width:10, height:10, x:canvas.width*.25, y:75, color:"red"})
point2 = new GameObject({width:10, height:10, x:canvas.width*.75, y:75, color:"red"})
point3 = new GameObject({width:10, height:10, x:canvas.width*.20, y:470, color:"red"})
point4 = new GameObject({width:10, height:10, x:canvas.width*.80, y:470, color:"red"})
point5 = new GameObject({width:10, height:10, x:canvas.width*.10, y:250, color:"red"})
point6 = new GameObject({width:10, height:10, x:canvas.width*.90, y:250, color:"red"})

//Point Array
var points = new Array();
var points = [point1, point2, point3, point4, point5, point6];
distances = new Array();

//Global Physics Variables
var fX = .93;
var fY = .92;

var gravity = 1;

//Ste to 60FPS 
interval = 1000/60;
timer = setInterval(animate, interval);

function getClosestPoint()
{
	points.sort((a, b) => a.distance(player) - b.distance(player));
	return points[0];
}

function animate()
{
	ctx.clearRect(0,0,canvas.width, canvas.height);	
	frictionY = .97;
	//Change Point Colors
	for (point in points)
	{
		points[point].color = "red";
	}
	if(Math.abs(getClosestPoint().distance(player)) < 150)
	{
		getClosestPoint().color = "yellow";
		frictionY = .50;
	}

	if(space && Math.abs(getClosestPoint().distance(player)) < 160 && canRope)
	{
		canRope = false;
		player.canJump = true;
		//Draw Line
		ctx.save()
		ctx.beginPath();
		ctx.moveTo(player.x, player.y);
		ctx.lineTo(getClosestPoint().x, getClosestPoint().y);
		ctx.stroke();
		ctx.restore();

		//Calculations
		player.vx = Math.cos(player.angle(getClosestPoint())) * 20;
		player.vy = Math.sin(player.angle(getClosestPoint())) * 40;
		
		clearTimeout(ropeTimer);
		ropeTimer = setTimeout(setRope, 400)
	}

	//
	setRope = function()
	{
		canRope = true;
	}

	//Jump with the w key

	if(w && player.canJump)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}
	//Apply acceleration to velocity.
	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}

	//Friction
	player.vx *= fX;
	player.vy *= fY;
	
	//Gravity
	player.vy += gravity;
	
	//Makes Charecter not move on decimal points
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	
	//Hit the ground
	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform1.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	//left
	if(player.x < player.width/2)
    {
        player.vx = 0;
        player.x = player.width/2;
    }
    //Right
    if(player.x > canvas.width - player.width/2)
    {
        player.vx = 0;
        player.x = canvas.width - player.width/2;
    }

	//Draw
	platform0.drawRect();
	platform1.drawRect();
	player.drawCircle();
	point1.drawRect();
	point2.drawRect();
	point3.drawRect();
	point4.drawRect();
	point5.drawRect();
	point6.drawRect();

	//Show hit points
	//player.drawDebug();
}

