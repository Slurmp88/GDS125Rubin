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

player = new GameObject();


//This platform uses an object literal to define the properties
platform0 = new GameObject({width:1200, height:50, x:canvas.width/2, y:700, color:"green"});
point1 = new GameObject({width:20, height:20, x:canvas.width*.25, y:300, color:"red"})
point2 = new GameObject({width:20, height:20, x:canvas.width*.75, y:300, color:"red"})

//Point Array
var points = new Array();
var points = [point1, point2];
distances = new Array();

//Global Physics Variables
var fX = .93;
var fY = .97;

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
	console.log(canRope);
	ctx.clearRect(0,0,canvas.width, canvas.height);	

	//Change Point Colors
	for (point in points)
	{
		points[point].color = "red";
	}
	if(Math.abs(getClosestPoint().distance(player)) < 300)
	{
		getClosestPoint().color = "yellow";
	}

	if(space && Math.abs(getClosestPoint().distance(player)) < 300 && canRope)
	{
		canRope = false;
		//Draw Line
		ctx.save()
		ctx.beginPath();
		ctx.moveTo(player.x, player.y);
		ctx.lineTo(getClosestPoint().x, getClosestPoint().y);
		ctx.stroke();
		ctx.restore();

		//Calculations
		player.vx = Math.cos(player.angle(getClosestPoint())) * 50;
		player.vy = Math.sin(player.angle(getClosestPoint())) * 50;
		
		clearTimeout(ropeTimer);
		ropeTimer = setTimeout(setRope, 1000)
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
	

	//Draw
	platform0.drawRect();
	player.drawRect();
	point1.drawRect();
	point2.drawRect();

	//Show hit points
	player.drawDebug();
}

