const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 30; // Size of each maze cell
const playerSize = 10; // Player's dot size
let playerX = cellSize / 2;
let playerY = cellSize / 2;

const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function drawMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = '#333333'; // Wall color
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, playerSize, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0000'; // Player color
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawMaze();
    drawPlayer();
}

function movePlayer(dx, dy) {
    let newX = playerX + dx;
    let newY = playerY + dy;

    let col = Math.floor(newX / cellSize);
    let row = Math.floor(newY / cellSize);

    if (maze[row][col] === 0) { // Check for wall collision
        playerX = newX;
        playerY = newY;
    }
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            movePlayer(0, -cellSize);
            break;
        case 'ArrowDown':
        case 's':
            movePlayer(0, cellSize);
            break;
        case 'ArrowLeft':
        case 'a':
            movePlayer(-cellSize, 0);
            break;
        case 'ArrowRight':
        case 'd':
            movePlayer(cellSize, 0);
            break;
    }
    draw();
});

draw();

