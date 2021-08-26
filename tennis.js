const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth -50;
canvas.height = window.innerHeight - 50;
let manScore = 0;
let unmanScore = 0;
let tpFatness= 20;
let tpHeight = 80;
let ayeSigh = 100;
let pSpeed = 4;
let eSpeed = 6;
let iSpeed = 0;
let bSpeed = -4;

class ball {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speed;
        this.speedY = speed;
    }

    represent () {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        this.represent();
        this.bounce();
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    }

    bounce() {
        if(canvas.height<this.y+this.size || this.y < 0) {
            this.speedY = this.speedY * -1;
        }
    }
    score(){
        let r = false
        if(canvas.width<this.x+this.size){
            manScore++;
            r = true;
        } else if(this.x < 0) {
            unmanScore++;
            r = true;
        }
        return r;
    }

    getHit() {
        this.speedX = this.speedX * -1;
    }

}

class tennisPlayer {
    constructor (x, y, height, width, speed) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.speed = speed;
    }

    represent() {
        c.fillStyle = 'blue';
        c.fillRect(this.x, this.y, this.width, this.height);
    }

    defend(ballX, ballY, ballDim) {
        let r = false
        if (ballX < this.x + this.width &&
            ballX + ballDim > this.x &&
            ballY < this.y + this.height &&
            ballY + ballDim > this.y) {
             r = true;
         }
         return r;
    }
}

class man extends tennisPlayer {
    constructor(x, y, height, width, speed) {
        super(x, y, height, width, speed);
    }
    bounce() {
        if(this.y>=canvas.height-this.height || this.y<=0){
            iSpeed=-iSpeed;
            console.log("bounce");
        }
    }
    update(){
        this.bounce();
        this.y=this.y + iSpeed;
    }
    

}

class unman extends tennisPlayer {
    constructor(x, y, height, width, speed) {
        super(x, y, height, width, speed);
    }

    follow(y) {
        //A.i ig. prie kampu kai buna iskyla problema. galetu nejudeti visada
        if(this.y+tpHeight<y) {
            this.speed = eSpeed;
        } else if(this.y-tpHeight>y) {
            this.speed = -eSpeed;
        } else if(this.y>canvas.height-this.height || this.y<0){
            this.speed = 0;
        }
        
        this.y = this.y + this.speed;
    }
}

let mainB = new ball(canvas.width/2,canvas.height/2, 20, bSpeed);
let player = new man(tpFatness, canvas.height/2-tpHeight/2, tpHeight, tpFatness, pSpeed+1);
let enemy = new unman(canvas.width-tpFatness*2, canvas.height/2-tpHeight/2, tpHeight, tpFatness, eSpeed);

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.6)';//the fade happens here
    c.fillRect(0, 0, canvas.width, canvas.height);
   
    mainB.update();
    player.represent();
    enemy.represent();
    if(mainB.x>=canvas.width/2 - ayeSigh) {
        enemy.follow(mainB.y);
    }
    player.update();
    if(player.defend(mainB.x,mainB.y,mainB.size) || enemy.defend(mainB.x,mainB.y,mainB.size)) {
        mainB.getHit();
    }
    if(mainB.score()){
        mainB=spawnTheBall();
    }
    drawScore();
}

function spawnTheBall(){
    return new ball(canvas.width/2,canvas.height/2, 20, bSpeed);
}

document.addEventListener('keydown', move);
function move(e) {
    switch (e.keyCode) {
   
        case 38:
            iSpeed = -pSpeed;
            break;
     
        case 40:
            iSpeed = pSpeed;
            break;
    }
};
function drawScore() {
    c.font = "40px Arial";
    c.fillStyle = "red";
    c.fillText("Man score: "+manScore+", Not man score: "+unmanScore, canvas.width/4, 40);
}
animate();