var w = false;
var a = false;
var s = false;
var d = false;
var r = false;
var b1 = false;
var b2 = false;
var b3 = false;
var space = false;
var mouseDown = false;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);
document.addEventListener("mousedown", getMouseDown);
document.addEventListener("mouseup", isMouseUp);

function getMouseDown(e)
{
	mouseDown = true;
}
function isMouseUp(e)
{
	mouseDown = false;
}

function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log(e.keyCode);
	if(e.keyCode == 82)
	{
		r = true;
	}
	if(e.keyCode == 49)
	{
		b1 = true;
	}
	if(e.keyCode == 50)
	{
		b2 = true;
	}
	if(e.keyCode == 51)
	{
		b3 = true;
	}
	if(e.keyCode == 87)
	{
		w = true;
	}
	if(e.keyCode == 65)
	{
		a = true;
	}
	if(e.keyCode == 83)
	{
		s = true;
	}
	if(e.keyCode == 68)
	{
		d = true;
	}
	if(e.keyCode == 32)
	{
		space = true;
	}
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log(e.keyCode);
	if(e.keyCode == 82)
	{
		r = false;
	}
	if(e.keyCode == 49)
	{
		b1 = false;
	}
	if(e.keyCode == 50)
	{
		b2 = false;
	}
	if(e.keyCode == 51)
	{
		b3 = false;
	}
	if(e.keyCode == 87)
	{
		w = false;
	}
	if(e.keyCode == 65)
	{
		a = false;
	}
	if(e.keyCode == 83)
	{
		s = false;
	}
	if(e.keyCode == 68)
	{
		d = false;
	}
	if(e.keyCode == 32)
	{
		space = false;
	}
}
