var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var vx = 0;
var vy = 0;
var x = 0;
var y = 0;

var timer = requestAnimationFrame(main);

function randRange(High, Low){
    return Math.random() * (High - Low) + Low;
}

function circle()
{
    this.radius = randRange(40, 80)
    this.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
    this.x = canvas.width *.5;
    this.y = canvas.height *.5;
    this.vx = 10;
    this.vy = 5;

    this.drawCircle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        //Up
        if(this.y < this.radius)
        {
            this.vy = -this.vy;
            this.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
        }
        //Down
        if(this.y > canvas.height - this.radius)
        {
            this.vy = -this.vy;
            this.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
        }
        //Left
        if(this.x < this.radius)
        {
            this.vx = -this.vx;
            this.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
        }
        //Right
        if(this.x > canvas.width - this.radius)
        {
            this.vx = -this.vx;
            this.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
        }
    }
}

var circ = new circle();
function main()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    circ.drawCircle();
    circ.move();
    timer = requestAnimationFrame(main);
}
