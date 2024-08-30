const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentScene = 'start';
let userInput = '';

document.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
    if (e.key === 'Enter') {
        processInput();
    } else if (e.key === 'Backspace') {
        userInput = userInput.slice(0, -1);
    } else if (e.key.length === 1) {
        userInput += e.key;
    }
    updateCanvas();
}

function processInput() {
    const response = userInput.toLowerCase().trim();
    userInput = '';

    if (currentScene === 'start') {
        if (response === 'left') {
            currentScene = 'leftPath';
        } else if (response === 'right') {
            currentScene = 'rightPath';
        }
    } else if (currentScene === 'leftPath') {
        if (response === 'explore') {
            currentScene = 'exploreCave';
        } else if (response === 'return') {
            currentScene = 'start';
        }
    } else if (currentScene === 'rightPath') {
        if (response === 'cross') {
            currentScene = 'crossBridge';
        } else if (response === 'return') {
            currentScene = 'start';
        }
    } else if (currentScene === 'exploreCave' || currentScene === 'crossBridge') {
        currentScene = 'start'; // Reset the game
    }

    updateCanvas();
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentScene === 'start') {
        drawText("You are at a crossroads. Do you go LEFT or RIGHT?", 50, 100);
        drawText("Type your choice and press Enter.", 50, 150);
    } else if (currentScene === 'leftPath') {
        drawText("You chose the left path and found a cave.", 50, 100);
        drawText("Do you EXPLORE the cave or RETURN to the crossroads?", 50, 150);
    } else if (currentScene === 'rightPath') {
        drawText("You chose the right path and found a bridge.", 50, 100);
        drawText("Do you CROSS the bridge or RETURN to the crossroads?", 50, 150);
    } else if (currentScene === 'exploreCave') {
        drawText("You explore the cave and find treasure! You win!", 50, 100);
        drawText("Press Enter to restart.", 50, 150);
    } else if (currentScene === 'crossBridge') {
        drawText("You cross the bridge and fall into a river. Game over.", 50, 100);
        drawText("Press Enter to restart.", 50, 150);
    }

    drawText(`> ${userInput}`, 50, 250);
}

function drawText(text, x, y) {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
}

// Initial canvas update
updateCanvas();
