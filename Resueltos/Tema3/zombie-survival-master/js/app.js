// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();



/*
======================
 Creating the canvas. 
======================
*/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 480;
canvas.classList.add("somestyle");
document.body.appendChild(canvas);



/*
======================
 Defining terrain. 
======================
*/
var terrainPattern;


/*
======================
 The main game loop. 
======================
*/
var lastTime;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
};


/*
==========================================================================================
 Starting the game - Drawing terrain, hooking up play again and starting game with main(). 
==========================================================================================
*/
function init() {
    terrainPattern = ctx.createPattern(resources.get('img/field1.jpeg'), 'repeat');

    document.getElementById('play-again').addEventListener('click', function () {
        reset();
    });

    reset();
    lastTime = Date.now();

    main();
}

/*
=======================================
 Loading all images using resources.js. 
=======================================
*/
resources.load([
    'img/hero.png',
    'img/field1.jpeg',
    'img/zombie.png',
    'img/apple.png'
]);
resources.onReady(init);


/*
==========================================
 Game state - Spawning player and apple
==========================================
*/
var player = {
    sprite: new Sprite('img/hero.png', [0, 0], [32, 32])
};

var apple = {
    pos: [32 + (Math.random() * (canvas.width - 64)), 32 + (Math.random() * (canvas.height - 64))],
    sprite: new Sprite('img/apple.png', [0, 0], [32, 32])
};


/*
=============================================================
 Defining all variable that will be used throughout the game
=============================================================
*/
var applesCollected = 0;
var obstacle = [];
var gameTime = 0;
var isGameOver;

/*
========================
 Score initialised to 0. 
========================
*/
var score = 0;
var scoreElement = document.getElementById('score');


/*
============================
 Speed in pixels per second
============================
*/
var playerSpeed = 200;
var obstacleSpeed = 100;


/*
=========================
 Update all game objects
=========================
*/
function update(dt) {
    gameTime += dt;

    handleInput(dt);
    updateEntities(dt);

    // It gets harder over time by adding obstacles using this equation: 1-.998^gameTime
    if (Math.random() < 1 - Math.pow(.999, gameTime)) {
        obstacle.push({
            pos: [Math.random() * (canvas.width - 32), canvas.height],
            sprite: new Sprite('img/zombie.png', [0, 0], [32, 32])
        });
    }

    // Checking if player caught a apple. If yes, score is incremented by 1
    if (
        player.pos[0] <= (apple.pos[0] + 32) && apple.pos[0] <= (player.pos[0] + 32) && player.pos[1] <= (apple.pos[1] + 32) && apple.pos[1] <= (player.pos[1] + 32)) {
        playSound('crunch');
        ++applesCollected;
        score = applesCollected;
        resetMonsters();
    }

    checkCollisions();

    scoreElement.innerHTML = "Score: " + score;
};

/*
=========================
 Apple Crunch ?
=========================
*/

function playSound(value) {
    var sound = document.getElementById(value);
    sound.loop = false;
    sound.play();
}


/*
=========================
 Keyboard input by user
=========================
*/
function handleInput(dt) {
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if (input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }

    if (input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }

}


/*
=========================
 Update all the obstacles
=========================
*/
function updateEntities(dt) {
    for (var i = 0; i < obstacle.length; i++) {
        obstacle[i].pos[1] -= obstacleSpeed * dt;
        obstacle[i].sprite.update(dt);
    }
}


/*
============
 Collisions
============
*/
function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
        b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
        pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
        pos2[0] + size2[0], pos2[1] + size2[1]);
}


/*
============================================================
 Checking if apple and player collides. If yes, game over.
============================================================
*/
function checkCollisions() {

    checkPlayerBounds();

    // Collision Detection
    for (var i = 0; i < obstacle.length; i++) {
        var pos = obstacle[i].pos;
        var size = obstacle[i].sprite.size;

        if (boxCollides(pos, size, player.pos, player.sprite.size)) {
            gameOver();
        }
    }
}



/*
==============================
 Making player stay in canvas.
==============================
*/
function checkPlayerBounds() {
    if (isGameOver === false) {
        if (player.pos[0] < 0) {
            player.pos[0] = 0;
        } else if (player.pos[0] > canvas.width - player.sprite.size[0]) {
            player.pos[0] = canvas.width - player.sprite.size[0];
        }

        if (player.pos[1] < 0) {
            player.pos[1] = 0;
        } else if (player.pos[1] > canvas.height - player.sprite.size[1]) {
            player.pos[1] = canvas.height - player.sprite.size[1];
        }
    }
}


/*
=================
 Draw everything
=================
*/
function render() {
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render the player if the game isn't over
    if (!isGameOver) {
        renderEntity(player);
    }

    // Render obstacles and apples.
    renderEntities(obstacle);
    renderEntity(apple);
};

/*
================================================
 Function for rendering obstacles - using array
================================================
*/
function renderEntities(list) {
    for (var i = 0; i < list.length; i++) {
        renderEntity(list[i]);
    }
}


/*
===========================================
 Function for rendering player and apple
===========================================
*/
function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}


/*
===========
 Game Over
===========
*/
function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    document.getElementById('game-over-score').innerHTML = 'Score: ' + score;
    isGameOver = true;
    player.pos[0] = (canvas.width - (canvas.width * 2));
    player.pos[1] = (canvas.height - (canvas.height * 2));
    playSound('gameover');
}



/*
=======================
 Reset game to original
=======================
*/
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    gameTime = 0;
    score = 0;
    applesCollected = 0;

    obstacle = [];

    player.pos = [50, canvas.height / 2];

    apple.pos[0] = 32 + (Math.random() * (canvas.width - 64));
    apple.pos[1] = 32 + (Math.random() * (canvas.height - 64));
};


/*
========================================================================
 Reset incoming spawning apple position after player caught a apple
========================================================================
*/
function resetMonsters() {
    apple.pos[0] = 32 + (Math.random() * (canvas.width - 64));
    apple.pos[1] = 32 + (Math.random() * (canvas.height - 64));
}