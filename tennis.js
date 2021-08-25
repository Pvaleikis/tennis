const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth -50;
canvas.height = window.innerHeight - 50;

let tpFatness= 20;
let tpHeight = 700;

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
        if(canvas.width<this.x+this.size || this.x < 0) {
            console.log("score");
            
        } 
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
}

class unman extends tennisPlayer {
    constructor(x, y, height, width, speed) {
        super(x, y, height, width, speed);
    }

    follow(y) {

    }
}

let mainB = new ball(canvas.width/2,canvas.height/2, 20, -5);
let player = new tennisPlayer(tpFatness, canvas.height/2-tpHeight/2, tpHeight, tpFatness, 5);

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.6)';//the fade happens here
    c.fillRect(0, 0, canvas.width, canvas.height);
    mainB.update();
    player.represent();
    if(player.defend(mainB.x,mainB.y,mainB.size)) {
        mainB.getHit();
    }
}

animate();