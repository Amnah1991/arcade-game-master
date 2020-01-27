
class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // Parameter: dt, a time delta between ticks
    update(dt) {
        // dt ensure the game runs at the same speed for
        this.x = this.x + this.speed * dt;
        if (float2int(this.x - 100) === player.x || float2int(this.x + 100) === player.x || float2int(this.x) === player.x) {
            if (this.y - 100 === player.y || this.y + 100 === player.y || this.y === player.y) {
                console.log(float2int(this.x),this.y);
                player.rest();
                resetPrizes();
            }
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    }
    update() {
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        if (key === "up") {
            if (this.y > 0) {
                this.y = this.y - 100;
            } else {
                // To win you have to collect 3 gems or 2 hearts or 1 key and reach the water
                if ((parseInt(gemBlue.innerText) + parseInt(gemGreen.innerText) + parseInt(gemOrange.innerText)) >= 3
                    || parseInt(heart.innerText) >= 2
                    || parseInt(key.innerText) >= 1) {
                    alert('W I N N E R ! ! ! ! !');
                    this.rest();
                    resetPrizes();
                }
            }
        } else if (key === "down") {
            if (this.y < 400) {
                this.y = this.y + 100;
            }
        }
        else if (key === "left") {
            if (this.x > 0) {
                this.x = this.x - 100;
            }
        }
        else if (key === "right") {
            if (this.x < 400) {
                this.x = this.x + 100;
            }
        }
        prizes.forEach(prize => {
            if (this.x === prize.x && this.y === prize.y) {
                if (prize.type === 'images/gem-blue.png') {
                    gemBlue.innerText = parseInt(gemBlue.innerText) + 1;
                } else if (prize.type === 'images/gem-orange.png') {
                    gemOrange.innerText = parseInt(gemOrange.innerText) + 1;
                } else if (prize.type === 'images/gem-green.png') {
                    gemGreen.innerText = parseInt(gemGreen.innerText) + 1;
                } else if (prize.type === 'images/Heart.png') {
                    heart.innerText = parseInt(heart.innerText) + 1;
                } else if (prize.type === 'images/Key.png') {
                    keyIcon.innerText = parseInt(keyIcon.innerText) + 1;
                }
                prize.type = '';
            }
        });
    }
    rest() {
        this.x = 200;
        this.y = 400;
    }
}

class Collection {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    render() {
        if (this.type) {
            ctx.drawImage(Resources.get(this.type), this.x, this.y);
        }
    }
    update() {
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

const gemArr = ['images/gem-blue.png',
    'images/gem-green.png',
    'images/gem-orange.png',
    'images/Heart.png',
    'images/Key.png',
    'images/gem-blue.png',
    'images/gem-green.png',
    'images/gem-orange.png',
    'images/Heart.png',
    'images/gem-blue.png',
    'images/Heart.png'
];

let gemOrange = document.getElementById('gemOrange');
let gemBlue = document.getElementById('gemBlue');
let gemGreen = document.getElementById('gemGreen');
let heart = document.getElementById('heart');
let keyIcon = document.getElementById('key');

const prizes = new Array();
resetPrizes();

const allEnemies = new Array();
allEnemies[0] = new Enemy(-500, 100, getRandomNum800());
allEnemies[1] = new Enemy(-600, 100, getRandomNum800());
allEnemies[2] = new Enemy(-100, 200, getRandomNum800());
allEnemies[3] = new Enemy(-300, 0, getRandomNum800());

const result = document.querySelector('.result');

function getRandomNum800() {
    return Math.floor(Math.random() * 800) + 1;
}

function getRandomNum10() {
    return Math.floor(Math.random() * 10) + 1;
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const playerOptions = document.querySelector('.image-container');
playerOptions.addEventListener('click', function (e) {
    var img = e.target.getAttribute('src');
    if (img) {
        img = img.replace('./', '');
        player.sprite = img;
        player.rest();
    }
});

setInterval(function () {
    allEnemies.push(new Enemy(-100, 0, getRandomNum800()));
    allEnemies.push(new Enemy(-400, 200, getRandomNum800()));
    allEnemies.push(new Enemy(-300, 100, getRandomNum800()));
}, 5000);

function float2int(value) {
    return value | 0;
} 

function resetPrizes() {
    prizes[0] = new Collection(100, 300, gemArr[getRandomNum10()]);
    prizes[1] = new Collection(300, 100, gemArr[getRandomNum10()]);
    prizes[2] = new Collection(400, 400, gemArr[getRandomNum10()]);
    prizes[3] = new Collection(0, 200, gemArr[getRandomNum10()]);
    prizes[4] = new Collection(400, 200, gemArr[getRandomNum10()]);
    gemOrange.innerText = 0;
    gemBlue.innerText = 0;
    gemGreen.innerText = 0;
    heart.innerText = 0;
    keyIcon.innerText = 0;
}