const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cols = 20;  // Number of columns in the maze
const rows = 20;  // Number of rows in the maze
const cellSize = canvas.width / cols;  // Dynamic cell size based on canvas size

const playerSize = cellSize / 2;  // Player's dot size, scaled to cell size
let playerX = cellSize / 2;
let playerY = cellSize / 2;

// A solvable maze
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function drawMaze() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
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

    // Check if the new position is within bounds and not colliding with walls
    if (col >= 0 && col < cols && row >= 0 && row < rows && maze[row][col] === 0) {
        playerX = newX;
        playerY = newY;
    }
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            movePlayer(0, -cellSize / 4); // Move up
            break;
        case 'ArrowDown':
        case 's':
            movePlayer(0, cellSize / 4); // Move down
            break;
        case 'ArrowLeft':
        case 'a':
            movePlayer(-cellSize / 4, 0); // Move left
            break;
        case 'ArrowRight':
        case 'd':
            movePlayer(cellSize / 4, 0); // Move right
            break;
    }
    draw();
});

draw();
