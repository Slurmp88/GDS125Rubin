
var canvas = document.getElementById("canvas");
	
var context = canvas.getContext("2d");

//Mouse Positional Data
var mousex = 0;
var mousey = 0;

document.addEventListener("mousemove", () => {
var rect = canvas.getBoundingClientRect();
mousex = event.clientX - rect.left; // Gets Mouse X
mousey = event.clientY - rect.top; // Gets Mouse Y
});

var interval = 1000/60;
var timer = setInterval(animate, interval);

var player = new GameObject({width:50, height:50, angle:0, x:canvas.width/2, y:canvas.height - 300, force:1, color:"gray", health: 100})

//This is used to move the level elements
var level = new Level();
//This generates a tile based level.
level.generate(level.l1, 100, 100);	

var fx = .85;
var fy = .85;
var canRope = true;
var ropeTimer;
var states =[];
var currentState = "menu";

//Round/Enemy Vars
var enemyAmount = 10;
var rounds;
var enemyDifficulty;
var enemySpawns = [];

//Bullet Vars
var canShoot = true;
var _bullets = [];
var explosion = [];
var empty = [];
var hasAmmo = true;
var shotDelay;
var reloadDelay;
var isLoading = false;
var bulletCount = 0;
//When moving the level, we first move the player as usual. Then we utilize an offset object to keep track of how much the collision detection affects the player's position. Then we move both the player and the level back the total number of pixels that the player moved over one loop of animation.

states["menu"] = function()
{
	context.save();
	context.font = "30px Arial"
	context.fillStyle = "black"
	context.textAlign = "center";
	context.fillText("Press SPACE to play!", canvas.width/2, canvas.height/2);
	context.restore();
	console.log(space);
	if(space)
	{
		resetAllVars();
		currentState = "play";
	}
}

//Create Guns
var pistol = new Gun({width:25, height:10, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 400, ammo:17, ammoCount: 17, damage: 5, velocity: 50, reloadSpeed: 700})

var launcher = new Gun({explosive: true, explosionSize: 1, ammoSize: 3, width:80, height:16, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 400, ammo:1, ammoCount: 1, damage: 15, velocity: 20, reloadSpeed: 1600})

var rifle = new Gun({distance: 15, width:60, height:10, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 100, ammo:30, ammoCount: 30, damage: 11, velocity: 50, reloadSpeed: 1000})

var ShotGun = new Gun({knockback: 10, shotDivergence: 6, distance: 15, width:40, height:16, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 260, ammo:2, ammoCount: 2, damage: 4, velocity: 30, reloadSpeed: 1000, pelletCount: 10})

var subGun = new Gun({ shotDivergence: 5, distance: 15, width:35, height:10, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 50, ammo:50, ammoCount: 50, damage: 8, velocity: 30, reloadSpeed: 700, pelletCount: 1})


var gun = pistol;


states["play"] = function()
{
	if(player.health > 0)
	{
		//Apply acceleration to velocity. 
		if(a)
		{
			player.vx += -player.ax * player.force;
		}
		if(d)
		{
			player.vx += player.ax * player.force;
		}
		if(s)
		{
			player.vy += player.ay * player.force;
		}
		if(w)
		{
			player.vy += -player.ay * player.force;
		}

		//MOVE PLAYER
		player.vx *= fx;
		player.vy *= fy;
		player.x += player.vx;
		player.y += player.vy;
		
		//Used to move the player and level back so that it appears as though the level moved and not the player.
		var offset = {x:player.vx, y:player.vy};

		//console.log((offset));

		//All tile code
		for(var i = 0; i < level.grid.length; i++)
		{
			level.grid[i].drawRect();

			//Hit top
			while(level.grid[i].hitTestPoint(player.top()))
			{
				player.vy = 0;
				player.y++;
				offset.y++;
			}
			//Hit right
			while(level.grid[i].hitTestPoint(player.right()))
			{
				player.vx = 0;
				player.x--;
				offset.x--;
			}
			//Hit left
			while(level.grid[i].hitTestPoint(player.left()))
			{
				player.vx = 0;
				player.x++;
				offset.x++;
			}
			//Hit bottom
			while(level.grid[i].hitTestPoint(player.bottom()))
			{
				player.vy = 0;
				player.y--;
				offset.y--;
			}
		
			/*while(level.grid[i].hitTestPoint({x:player.left().x, y:player.bottom().y, world:player.world}))
			{
				player.y--;
				player.vy = 0;
				offset.y--;
			}*/
			/*while(level.grid[i].hitTestPoint({x:player.right().x, y:player.bottom().y, world:player.world}))
			{
				player.y--;
				player.vy = 0;
				offset.y--;
			}*/
		}

		// Draw Points
		for(var i = 0; i < level.point.length; i++)
		{
			level.point[i].drawCircle();
		}
		
		//Rope Code
		//console.log(Math.abs(getClosestPoint().distance(player)))
		for(i in level.point)
		{
			level.point[i].color = "red";
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
			context.save()
			context.beginPath();
			context.moveTo(player.x + player.world.x, player.y+player.world.y);
			context.lineTo(getClosestPoint().x + getClosestPoint().world.x, getClosestPoint().y + getClosestPoint().world.y);
			context.stroke();
			context.restore();

			//Calculations
			player.vx = Math.cos(player.getAngle(getClosestPoint())) * 20;
			player.vy = Math.sin(player.getAngle(getClosestPoint())) * 40;
			
			clearTimeout(ropeTimer);
			ropeTimer = setTimeout(setRope, 400)
		}

		//Gun Code **********************************************************

		if(b1)
		{
			if(gun.ammo == 0)
			{
				canShoot = true;
			}
			gun = rifle;
		}
		if(b2)
		{
			if(gun.ammo == 0)
			{
				canShoot = true;
			}
			gun = subGun;
		}
		if(b3)
		{
			if(gun.ammo == 0)
			{
				canShoot = true;
			}
			gun = ShotGun;
		}

		//Move Gun X and Y to correct Posistions
		var gunAngle = ((player.angle * 180 / Math.PI) + 45) * Math.PI / 180;
		gun.x = player.x + (Math.cos(gunAngle) * player.width/2) - offset.x;
		gun.y = player.y + (Math.sin(gunAngle) * player.width/2) - offset.y;

		//rotate Gun
		gun.angle = gun.getAngle({x:mousex, y:mousey, world:player.world});
		//rotate Player
		player.angle = player.getAngle({x:mousex, y:mousey, world:player.world});

		//Shooting Code
		if(mouseDown && canShoot && hasAmmo)
		{
			canShoot = false;
			if(gun.ammo != 0)
			{
				gun.ammo--;
				if(gun.pelletCount == 1)
				{
					_bullets[bulletCount] = new GameObject({width:10 * gun.ammoSize, height:5 * gun.ammoSize, angle:gun.angle, x:gun.x, y:gun.y, vx: Math.cos(gun.angle + (rand(-gun.shotDivergence, gun.shotDivergence) * Math.PI/180)) * gun.velocity, vy:Math.sin(gun.angle + (rand(-gun.shotDivergence, gun.shotDivergence) * Math.PI/180)) * gun.velocity, damage: gun.damage});
					bulletCount++;
				}
				else
				{
					for(var i = 0; i < gun.pelletCount; i++)
					{
						_bullets[bulletCount] = new GameObject({width:10, height:5, angle:gun.angle, x:gun.x, y:gun.y, vx: Math.cos(gun.angle + (rand(-gun.shotDivergence, gun.shotDivergence) * Math.PI/180)) * (gun.velocity + rand(-1, 1)), vy:Math.sin(gun.angle + (rand(-gun.shotDivergence, gun.shotDivergence) * Math.PI/180)) * (gun.velocity + rand(-1, 1)), damage: gun.damage});
						bulletCount++;
					}
					//console.log(_bullets);
				}
				clearTimeout(shotDelay);
				shotDelay = setTimeout(reset, gun.fireRate);
			}
		}
		//Reloading Code
		if(r && !mouseDown)
		{
			canShoot = false;
			clearTimeout(reloadDelay);
			isLoading = true;
			reloadDelay = setTimeout(stopLoading, gun.reloadSpeed);
		}
		//******************************************************************************* */

		//Moves the level and the player back the total number of pixels traveled over one animation loop.
		player.x -= offset.x;
		player.y -= offset.y;
		level.x -= offset.x;
		level.y -= offset.y;

		//Draws the player
		player.drawRect();
		//player.drawDebug();

		//Draw Gun
		gun.drawRect();

		//Enemy Code ********************************************

		//Enemy Spawnin
		var spawns = [];
		var empty = [];
		var currSpawn;
		var curX;
		var curY;
		var randDev;
		var time;
		var change = true;
		spawns = getFurthestSpawnPoint(player);
		var b = 0;
		if(!enemysAlive(enemySpawns))
		{
			enemySpawns = empty;
			enemyAmount++;
			for(var i = 0; i < enemyAmount; i++)
			{
				var random = Math.round(rand(0,4));
				currSpawn = spawns[(spawns.length - 1) - random];
				curX = currSpawn.x;
				curY = currSpawn.y;
				enemySpawns[i] = new Enemy({x:curX, y:curY, width:50, height:50, color: `rgb(${rand(0,255)}, ${rand(0,255)}, ${rand(0,255)})`, damage: 5, force: 2, world: level, health: 40});
			}
		}

		//Collision
		for(var i = 0; i < level.grid.length; i++)
		{
			for(em in enemySpawns)
			{
				//Hit top
				while(level.grid[i].hitTestPoint(enemySpawns[em].top()))
				{
					enemySpawns[em].vy = 0;
					enemySpawns[em].y++;
				}
				//Hit right
				while(level.grid[i].hitTestPoint(enemySpawns[em].right()))
				{
					enemySpawns[em].vx = 0;
					enemySpawns[em].x--;
				}
				//Hit left
				while(level.grid[i].hitTestPoint(enemySpawns[em].left()))
				{
					enemySpawns[em].vx = 0;
					enemySpawns[em].x++;
				}
				//Hit bottom
				while(level.grid[i].hitTestPoint(enemySpawns[em].bottom()))
				{
					enemySpawns[em].vy = 0;
					enemySpawns[em].y--;
				}

				if(player.hitTestPoint(enemySpawns[em].bottom()))
				{
					player.health -= enemySpawns[em].damage * 2;
					enemySpawns[em].x = 1000000000;
					enemySpawns[em].health = 0;
				}
			}
		}

		//Draw Enemys
		for(et in enemySpawns)
		{
			enemySpawns[et].drawTriangle();
			follow(player, enemySpawns[et]);
		}


		//Bullet Collisions
		for(var bullet = 0; bullet < _bullets.length; bullet++)
		{
			_bullets[bullet].x += _bullets[bullet].vx;
			_bullets[bullet].y += _bullets[bullet].vy;
			_bullets[bullet].drawRect();
		
			for(var i = 0; i < level.grid.length; i++)
			{
				//Hit Walls
				for(en in enemySpawns)
				{
					if(enemySpawns[en].hitTestPoint({x:_bullets[bullet].x + _bullets[bullet].vx, y:_bullets[bullet].y + _bullets[bullet].vy, world:player.world}))
					{
						_bullets[bullet].x = 10000000000000000;
						enemySpawns[en].health -= _bullets[bullet].damage;
						enemySpawns[en].x += Math.cos((enemySpawns[en].angle * 180/Math.PI + 180)/180 * Math.PI) * 10;
						enemySpawns[en].y += Math.sin((enemySpawns[en].angle * 180/Math.PI + 180)/180 * Math.PI) * 10;
						if(enemySpawns[en].health <= 0)
						{
							enemySpawns[en].x = 100000000000000000000000; 							
						}
					}
				}
				if(level.grid[i].hitTestPoint({x:_bullets[bullet].x + _bullets[bullet].vx, y:_bullets[bullet].y + _bullets[bullet].vy, world:player.world}))
				{
					_bullets[bullet].x = 10000;
					_bullets[bullet].y = 10000;
				}
			}
		}

		//*******************************************************

		//Display Ammo/Reload
		if(!isLoading)
		{
			context.save();
			context.font = "30px Arial"
			context.fillStyle = "black"
			context.textAlign = "center";
			context.fillText("Ammo:"+ gun.ammo + "/" + gun.ammoCount, 90 - offset.x, 29 -offset.y);
			context.restore();
		}
		else
		{
			context.save();
			context.font = "30px Arial"
			context.fillStyle = "black"
			context.textAlign = "center";
			context.fillText("Ammo: Reloading...", 138 - offset.x, 29 -offset.y);
			context.restore();
		}

		//Display Health
		var healthBar = new GameObject({x:canvas.width - 80 - offset.x, y:29 - offset.y, height:50, width:150, color: "black"})
		var health = new GameObject({x:canvas.width - 80 - offset.x, y:29 - offset.y, height:50, width:150 * (player.health/100), color: "red"})
		healthBar.drawRect();
		health.drawRect();
	}
	else
	{
		currentState = "menu";
	}
}

//--------------------------------------------Animation Loop-------------------------------------------
function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	states[currentState]();
}

//-----------------------------------------------Functions----------------------------------------------

function resetAllVars()
{
	offset = {x:player.vx, y:player.vy};
	console.log(level.world);
	player = new GameObject({width:50, height:50, angle:0, x:canvas.width/2, y:canvas.height - 300, force:1, color:"gray", health: 100})

	pistol = new Gun({width:25, height:10, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 400, ammo:17, ammoCount: 17, damage: 5, velocity: 50, reloadSpeed: 700})
	launcher = new Gun({explosive: true, explosionSize: 1, ammoSize: 3, width:80, height:16, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 400, ammo:1, ammoCount: 1, damage: 15, velocity: 20, reloadSpeed: 1600})
	rifle = new Gun({distance: 15, width:60, height:10, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 100, ammo:30, ammoCount: 30, damage: 11, velocity: 50, reloadSpeed: 1000})
	ShotGun = new Gun({knockback: 10, shotDivergence: 6, distance: 15, width:40, height:16, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 260, ammo:2, ammoCount: 2, damage: 4, velocity: 30, reloadSpeed: 1000, pelletCount: 10})
	subGun = new Gun({ shotDivergence: 5, distance: 15, width:35, height:10, angle:0, x:canvas.width/2, y:canvas.height - 275, color:"black", fireRate: 50, ammo:50, ammoCount: 50, damage: 8, velocity: 30, reloadSpeed: 700, pelletCount: 1})
	canRope = true;
	gun = pistol;
	pistol.ammo = pistol.ammoCount;
	rifle.ammo = rifle.ammoCount;
	ShotGun.ammo = ShotGun.ammoCount;
	subGun.ammo = subGun.ammoCount;
	launcher.ammo = launcher.ammoCount;

	ropeTimer;
	level.x = 0;
	level.y = 0;
	//Round/Enemy Vars
	enemyAmount = 10;
	rounds;
	enemyDifficulty;
	enemySpawns = [];
	
	//Bullet Vars
	canShoot = true;
	_bullets = [];
	explosion = [];
	empty = [];
	hasAmmo = true;
	shotDelay;
	reloadDelay;
	isLoading = false;
	bulletCount = 0;
}

function getClosestPoint()
{
	level.point.sort((a, b) => a.distance(player) - b.distance(player));
	return level.point[0];
}

function getFurthestSpawnPoint()
{
	level.enemySpawn.sort((a, b) => a.distance(player) - b.distance(player));
	return level.enemySpawn;
}

reset = function()
{
	canShoot = true;
}

stopLoading = function()
{
	isLoading = false;
	canShoot = true;
	reload(gun);
	_bullets = empty;
	bulletCount = 0;
}

follow = function(player, follower)
{
	var dx = (player.x - follower.world.x) - follower.x;
	var dy = (player.y - follower.world.y) - follower.y;
	var dist = Math.sqrt(dx * dx + dy * dy);
	var radians = Math.atan2(dy, dx);

	follower.angle = radians;

	follower.vx = Math.cos(radians)*follower.force;
	follower.vy = Math.sin(radians)*follower.force;

	follower.x += follower.vx * 2;
	follower.y += follower.vy * 2;
}

setRope = function()
{
	canRope = true;
}

reload = function(gun)
{
	gun.ammo = gun.ammoCount;
}

enemysAlive = function(enemys)
{
	var yes = false;
	for(enemy in enemys)
	{
		if(enemys[enemy].health > 0)
		{
			yes = true;
		}
	}
	return yes;
}
