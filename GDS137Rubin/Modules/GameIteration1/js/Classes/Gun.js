
function Gun(obj)
{
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.width = 100;
    this.height = 100;
    this.color = "#ff0000";
 	this.sprite = new Image("");
    this.fireRate = 1;
    this.ammoCount = 1;
    this.damage = 1;
    this.pelletCount = 1;
    this.velocity = 1;
    this.ammoSize = 1;
    this.reloadSpeed = 90;
    this.distance = 0;
    this.shotDivergence = 0;
    this.explosive = false;
    this.explosionSize = 1;
    this.knockback =0;

    this.world = {x:0, y:0};
    this.ammo = 0;
    //the angle that the graphic is drawn facing.
    this.angle = 0;	
    //------Allows us to pass object literals into the class to define its properties--------//
    //------This eliminate the need to pass in the property arguments in a specific order------------//
    if(obj!== undefined)
    {
        for(value in obj)
        {
            if(this[value]!== undefined)
            this[value] = obj[value];
        }
    }

    this.getAngle = function(obj)
    {
        var xDist = (obj.world.x + obj.x) - (this.x + this.world.x);
        var yDist = (obj.world.y + obj.y) - (this.y + this.world.y);
        return Math.atan2(yDist, xDist)
    }

    this.drawRect = function()
    {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x + this.world.x, this.y + this.world.y);
            context.rotate(this.angle);
            context.fillRect((-this.width/2 + this.distance), (-this.height/2), this.width, this.height);
        context.restore();
    }	
}



