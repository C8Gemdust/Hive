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
        } else if (response === 'forward') {
            currentScene = 'forwardPath';
        }
    } else if (currentScene === 'leftPath') {
        if (response === 'explore') {
            currentScene = 'exploreCave';
        } else if (response === 'return') {
            currentScene = 'start';
        } else if (response === 'search') {
            currentScene = 'searchCave';
        }
    } else if (currentScene === 'rightPath') {
        if (response === 'cross') {
            currentScene = 'crossBridge';
        } else if (response === 'return') {
            currentScene = 'start';
        } else if (response === 'inspect') {
            currentScene = 'inspectBridge';
        }
    } else if (currentScene === 'forwardPath') {
        if (response === 'enter') {
            currentScene = 'enterTemple';
        } else if (response === 'return') {
            currentScene = 'start';
        }
    } else if (currentScene === 'exploreCave') {
        if (response === 'take') {
            currentScene = 'takeTreasure';
        } else if (response === 'leave') {
            currentScene = 'start';
        }
    } else if (currentScene === 'searchCave') {
        currentScene = 'findMap';
    } else if (currentScene === 'inspectBridge') {
        currentScene = 'bridgeBroken';
    } else if (currentScene === 'crossBridge') {
        currentScene = 'fallRiver';
    } else if (currentScene === 'enterTemple') {
        currentScene = 'templeMystery';
    } else if (currentScene === 'takeTreasure') {
        currentScene = 'win';
    } else if (currentScene === 'findMap') {
        currentScene = 'mapRevealsPath';
    } else if (currentScene === 'bridgeBroken') {
        currentScene = 'fallRiver';
    } else if (currentScene === 'fallRiver') {
        currentScene = 'start'; // Reset the game
    } else if (currentScene === 'templeMystery') {
        currentScene = 'start'; // Reset the game
    } else if (currentScene === 'mapRevealsPath') {
        currentScene = 'start'; // Reset the game
    } else if (currentScene === 'win') {
        currentScene = 'start'; // Reset the game
    }

    updateCanvas();
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentScene === 'start') {
        drawText("You are at a crossroads. Do you go LEFT, RIGHT, or FORWARD?", 50, 100);
        drawText("Type your choice and press Enter.", 50, 150);
    } else if (currentScene === 'leftPath') {
        drawText("You chose the left path and found a cave.", 50, 100);
        drawText("Do you EXPLORE the cave, SEARCH the cave, or RETURN to the crossroads?", 50, 150);
    } else if (currentScene === 'rightPath') {
        drawText("You chose the right path and found a bridge.", 50, 100);
        drawText("Do you CROSS the bridge, INSPECT the bridge, or RETURN to the crossroads?", 50, 150);
    } else if (currentScene === 'forwardPath') {
        drawText("You chose the forward path and found an ancient temple.", 50, 100);
        drawText("Do you ENTER the temple or RETURN to the crossroads?", 50, 150);
    } else if (currentScene === 'exploreCave') {
        drawText("You explore the cave and find a treasure chest.", 50, 100);
        drawText("Do you TAKE the treasure or LEAVE it and RETURN?", 50, 150);
    } else if (currentScene === 'searchCave') {
        drawText("You search the cave and find a hidden map.", 50, 100);
        drawText("Press Enter to RETURN to the crossroads.", 50, 150);
    } else if (currentScene === 'inspectBridge') {
        drawText("You inspect the bridge and find it is unstable.", 50, 100);
        drawText("Do you CROSS the bridge or RETURN to the crossroads?", 50, 150);
    } else if (currentScene === 'crossBridge') {
        drawText("You cross the bridge but it collapses, and you fall into a river.", 50, 100);
        drawText("Press Enter to RETURN to the crossroads.", 50, 150);
    } else if (currentScene === 'enterTemple') {
        drawText("You enter the temple and encounter a mysterious force.", 50, 100);
        drawText("Press Enter to RETURN to the crossroads.", 50, 150);
    } else if (currentScene === 'takeTreasure') {
        drawText("You take the treasure and find a way out of the cave.", 50, 100);
        drawText("You WIN! Press Enter to restart.", 50, 150);
    } else if (currentScene === 'findMap') {
        drawText("The map reveals a new path to explore.", 50, 100);
        drawText("Press Enter to RETURN to the crossroads.", 50, 150);
    } else if (currentScene === 'bridgeBroken') {
        drawText("You find the bridge is broken and cannot cross.", 50, 100);
        drawText("Press Enter to RETURN to the crossroads.", 50, 150);
    } else if (currentScene === 'fallRiver') {
        drawText("You fall into the river and are swept away.", 50, 100);
        drawText("Press Enter to restart.", 50, 150);
    } else if (currentScene === 'templeMystery') {
        drawText("The temple holds many mysteries but no clear path forward.", 50, 100);
        drawText("Press Enter to RETURN to the crossroads.", 50, 150);
    } else if (currentScene === 'mapRevealsPath') {
        drawText("The map leads you to a new area to explore, but you must return to start.", 50, 100);
        drawText("Press Enter to RETURN to the crossroads.", 50, 150);
    } else if (currentScene === 'win') {
        drawText("Congratulations! You have successfully navigated the adventure.", 50, 100);
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
