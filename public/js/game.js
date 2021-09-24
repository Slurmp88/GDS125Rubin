
var canvas = document.getElementById(`canvas`);
var context = canvas.getContext(`2d`);

var interval = 1000/60;
var timer = setInterval(animate, interval);

/*------------Use this if you want to implement States---------------*/
var startButton = new GameObject();
var menuBackground = new GameObject();
var canvasBackground = new GameObject();
canvasBackground.width = 1024;
canvasBackground.height = 512;
canvasBackground.img.src = "images/TitleBack.png";
menuBackground.img.src = "images/Wizard2.png";
gameStates[`menu`] =function(){
	
	if(startButton.overlap(mouse))
	{
		if(mouse.pressed)
		{
			gameStates.changeState(`game`)
		}
		menuBackground.img.src = "images/Wizard3.png";
	}
	else
	{
		menuBackground.img.src = "images/Wizard2.png";
    }
	canvasBackground.drawStaticImage();
	menuBackground.drawStaticImage();
}

gameStates.changeState('menu');


var gravity = 1;
var friction = {x:.85,y:.97}

//Avatar
var wiz = new GameObject({width:64, height:108, spriteData:playerData}).makeSprite(playerData)
wiz.force=1

//Very back background
var sky = new GameObject({width:canvas.width, height:canvas.height, color:"cyan"})

//The ground
var ground = new GameObject({width:canvas.width*10, height:64,y:canvas.height-32, color:"green"})
ground.img.src=`images/Grass.png`
//A platform
var plat = new GameObject({width:256, height:64,y:canvas.height-300, color:"green"})
plat.img.src='images/Grass.png'
//

//A level object when it is moved other objects move with it.
var level = new GameObject({x:0,y:0});
ground.world = level;
plat.world = level;

//Cave foreground Tile Grid
var cave = new Grid(caveData, {world:level, x:1024, tileHeight:64, tileWidth:64});
//Cave background Tile Grid
var caveBack = new Grid(caveBackData, {world:level, x:1024, tileHeight:64, tileWidth:64});
//Cave Fore For Ground
var caveForeground = new Grid(caveForegroundData, {world:level, x:1024, tileHeight:64, tileWidth:64});

//This is a group used for collisions
var g1 = new Group();
g1.color= `rgb(251,0,254)`;

//Adds items to a group
g1.add([ground,plat])

//removes items from a group
//g1.remove([plat, cave.grid])

//Used to draw the rectangles
var rects = new Group();
rects.add([ground,plat])

//used to render the sprites
var sprites = new Group();
sprites.add([caveBack.grid, cave.grid, wiz])

var front = new Group();
front.add([caveForeground.grid])

//
var levelItems=new Group();
levelItems.add([caveBack.grid, wiz, ground, plat, cave.grid]);

//background
var bg = new GameObject({x:level.x,y:level.y, width:canvas.width*4, height:canvas.height})
bg.img.src=`images/Background.png`

//farbackground
var rbg = new GameObject({x:level.x, y:level.y, width:1024, height:350})
rbg.img.src=`images/Forground.png`

var rightBound = new GameObject({width:20, height:canvas.height, x:2300, world:level})
var leftBound = new GameObject({width:20, height:canvas.height, x:-2000, world:level})

//Bullet Shit
var _bullets = [];
var canShoot = true;
var shotTimer = 0;
var shotDelay = 50;
var currentBullet = 0;
for(let i = 0; i < 100; i++)
{
	_bullets[i] = new GameObject();
	_bullets[i].y = 10000;
}



gameStates[`game`] = function()
{
	var allowed = true;
	if(w && wiz.canJump && allowed == true)
	{
		wiz.canJump = false;
		wiz.vy = wiz.jumpHeight;
		wiz.changeState(`jump`);
		sounds.play('Jump', .5);
	}
	if(s)
	{
		wiz.changeState(`crouch`)
		allowed = false;
	}
	else{
		allowed = true;
	}
	
	if(!w && !s && !d && !a && canShoot && wiz.canJump && wiz.fin) wiz.changeState(`idle`)
	{
		wiz.width = 64;
	}

	if(d && allowed == true)
	{
		if(wiz.canJump)
		{
			wiz.changeState(`walk`)
		}
		wiz.vx += wiz.force
		wiz.dir=1;
	}
	if(a && allowed == true)
	{
		if(wiz.canJump)
		{
			wiz.changeState(`walk`)
		}
		wiz.vx += -wiz.force
		wiz.dir=-1;
	}
	
	//Shoot/////////////////////
	shotTimer--;
	if(shotTimer <= 0)
	{
		canShoot = true;
	}
	else
	{
		canShoot=false;
	}
	if(space)
	{
		if(canShoot)
		{
			shotTimer = shotDelay;
			sounds.play('Fireball', .5);
			wiz.changeState('attack');
			wiz.width = 120;
			
			_bullets[currentBullet].vx=10 * wiz.dir;
			_bullets[currentBullet].x = wiz.x - level.x + (20 * wiz.dir);
			_bullets[currentBullet].y = wiz.y;
			_bullets[currentBullet].world = level;
			_bullets[currentBullet].width = 10;
			_bullets[currentBullet].height = 10;
			currentBullet++;
			if(currentBullet>= _bullets.length)
			{
				currentBullet = 0;
			}
		}
	}
	/*lse
	{
		shotTimer = 0;
	}*/
	////////////////////////////

	wiz.vy+= gravity
	wiz.vx *= friction.x
	wiz.vy *= friction.y
	wiz.x += Math.round(wiz.vx)
	wiz.y += Math.round(wiz.vy)

	let offset = {x:Math.round(wiz.vx), y:Math.round(wiz.vy)}

	while(g1.collide(wiz.top) && wiz.vy < 0)
	{
		wiz.canJump = false;
			wiz.vy=0;
			wiz.y++;
			offset.y++;
	}

	while(g1.collide(wiz.bottom) && wiz.vy>=0)
	{
		wiz.canJump = true;
			wiz.vy=0;
			wiz.y--;
			offset.y--;
	}

	while(rightBound.overlap(wiz.right))
	{
		wiz.vx = 0;
		wiz.x--;
		offset.x--;
	}

	while(leftBound.overlap(wiz.right))
	{
		wiz.vx = 0;
		wiz.x++;
		offset.x++;
	}

	shotTimer--;
	if(shotTimer <= 0)
	{
		canShoot = true;
	}
	else
	{
		canShoot = false;
	}
	//Makes the level move
	wiz.x -= offset.x;
	level.x -= offset.x;
	rbg.x -= offset.x*.5;

	bg.x = level.x*.75;
	if(rbg.x < -rbg.width || rbg.x > rbg.width)
	{
		rbg.x=0; 
	}

	var pattern = context.createPattern(ground.img, 'repeat');
	ground.color = pattern;
	sky.drawRect()
	rbg.drawStaticImage([0,0]);
	rbg.drawStaticImage([-rbg.width,0]);
	rbg.drawStaticImage([rbg.width,0]);
	bg.drawStaticImage([-2000,0]);
	rects.render(`drawRect`)
	ground.drawStaticImage([-32, -32, 10, 10]);
	plat.drawStaticImage([-128,-32,256,64])

	/*context.beginPath()
	context.moveTo(0,wiz.bottom().y)
	context.lineTo(canvas.width,wiz.bottom().y)
	context.stroke();*/

	sprites.play().render(`drawSprite`);

	for(let i = 0; i < 100; i++)
	{
		_bullets[i].img.src = "images/fire.png"
		_bullets[i].drawStaticImage()
		_bullets[i].move();
		_bullets[i].angle+=100
	}

	front.play().render(`drawSprite`);
}
/*----------------------------------------------------------------------*/

//-------------------------AnimationLoop--------------------------------

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);
	/*-----------Use for State Machine ---------------------------------*/
	gameStates[gameStates.currentState]();
	/*-------------------------------------------------------------------*/
}



