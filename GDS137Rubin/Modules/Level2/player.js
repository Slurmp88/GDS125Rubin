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

    this.drawBox = function(){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y)
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        ctx.restore();
    }

    this.move = function()
    {
        charecter.x += charecter.vx;
        charecter.y += charecter.vy;
    }
}