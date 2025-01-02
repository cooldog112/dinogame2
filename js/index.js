const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;

var img_dino_list = []

var img_back = new Image();
var img_cactus = new Image();
for(i=1; i<5; i++){
    var img_dino = new Image();
    img_dino.src = 'img/pika'+i+'.png';    
    img_dino_list.push(img_dino);
}

img_back.src = 'img/background.jpg';
img_cactus.src = 'img/cactus.png';

var dino = {
    x: 50,
    y: canvas.height-100,
    width: 100,
    height: 100,
    index: 0,
    draw() {
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        if(frame%5==0){            
            this.index = (this.index + 1)%4;
        }
        ctx.drawImage(img_dino_list[this.index], this.x, this.y, this.width, this.height);
    }
}

class Cactus{    
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height-100;
        this.width = 50;
        this.height = 100;
    }
    draw() {
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_cactus, this.x, this.y, this.width, this.height);
    }
}


var jump=false;
var step=-2;
var frame = 0;
var cactus_list = [];
var animation;
function play() {
    animation = requestAnimationFrame(play);
    frame+=1;
    if(frame%360 == 1){
        var cactus = new Cactus();
        cactus_list.push(cactus);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img_back, 0,0,canvas.width, canvas.height);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Score : '+frame, canvas.width-100, 50);
    
    cactus_list.forEach((a, i, o)=>{
        if(a.x < -a.width){
            o.splice(i,1);
        }
        
        a.x-=3;
        a.draw();
        collision(dino, a);
    })
    
    if(jump==true){
        dino.y+=step;
        if(dino.y <= 350){
            step *= -1;
        }
        if(dino.y==500){
            jump=false;
            step *= -1;
        }
    }
    dino.draw();
}
play()


document.addEventListener('keydown', function(e){
    if(e.code == 'Space'){        
        jump = true;        
    }
})

function collision(dino, cactus){
    ctx.font = '30px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    var x_len = cactus.x - (dino.x + dino.width);
    var y_len = cactus.y - (dino.y + dino.height);

    if ((cactus.x > 50 && x_len < -10) && y_len < -10){
        ctx.fillText("Game Over!!!", canvas.width/2, canvas.height/2)
        cancelAnimationFrame(animation);
    }
}

