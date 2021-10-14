canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');

function player()
{
    this.color = "black";

    //Creation
    this.x = 0;
    this.y = 0;

    //Vector
    this.vx = 0;
    this.vy = 0;

    //Size
    this.width = 0;
    this.height = 0;

    this.drawCircle = function()
    {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.arc(0, 0, this.height/2, 0, 360 *Math.PI/180, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    this.drawBox = function(){
    	ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
		ctx.restore();
    }

    this.move = function()
    {
        this.x += this.vx;
        this.y += this.vy;
    }

    this.left = function() 
	{
		return this.x - this.width/2;
	}
	this.right = function() 
	{
		return this.x + this.width/2;
	}
	
	this.top = function() 
	{
		return this.y - this.height/2;
	}
	this.bottom = function() 
	{
		return this.y + this.height/2;
	}
	
	this.hitTestObject = function(obj)
	{
		if(this.left() < obj.right() && 
		   this.right() > obj.left() &&
		   this.top() < obj.bottom() &&
		   this.bottom() > obj.top())
		{
			return true
		}
		return false;
	}
}