// Author: Jihoon Yoon
// A01322277

import MESSAGES from '../lang/messages/en/user.js';

/*
    Button class.
*/
class Button {
    /*
        Constructor.
        :param order: The order number of the button.
        :param color: The color of the button.
        :param width: The width of the button.
        :param height: The height of the button.
        :param top: The top position of the button.
        :param left: The left position of the button.
    */
    constructor(order, color, width, height, top, left) {
        this.btn = document.createElement("button");
        this.btn.style.backgroundColor = color;
        this.btn.style.width = width;
        this.btn.style.height = height;
        this.btn.style.position = "absolute";
        this.btn.innerHTML = order;
        this.id = order;
        this.setLocation(top, left)
    }

    /*
        Set the position of the button.
        :param top: The top position of the button.
        :param left: The left position of the button.
    */
    setLocation(top, left) {
        this.btn.style.top = top;
        this.btn.style.left = left;
    }
}

/*
    ButtonGame class.
*/
class ButtonGame {
    /*
        Constructor.
    */
    constructor() {
        this.buttons = [];
        this.clickOrder = [];
    }

    /*
        Start the game by creating buttons.
        :param requested: The number of buttons to create.
    */
    createButtons(requested) {
        this.resetGame();
        for (let num = 1; num <= requested; num++) {
            let button = new Button(num, this.generateRandomColor(), "10em", "5em", "7em", `${10 * (num - 1) + 1}em`);
            this.buttons.push(button);
        }
        this.displayButtons();
        this.shuffleButtonsMultipleTimes();
    }

    /*
        Generate a random RGB color string.
    */
    generateRandomColor() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    /*
        Shuffle buttons around boundaries of the browser window repeatedly.
    */
    shuffleButtonsMultipleTimes() {
        let iterationCounter = 0;
        const BUTTON_SHUFFLE_INTERVAL = 2000;
        // We use () => {} instead of function() {} because function() creates its own scope and we want to use the scope of the class.
        const shuffling = setInterval(() => {
            iterationCounter++;
            console.log(iterationCounter, this.buttons.length);
            if (iterationCounter > this.buttons.length) {
                this.attachClickHandlers();
                clearInterval(shuffling);
            } else {
                this.shuffleButtonsOnce();
            }
        }, BUTTON_SHUFFLE_INTERVAL);
    }

    /*
        Shuffle buttons around boundaries of the browser window.
    */
    shuffleButtonsOnce() {
        for (let num = 0; num < this.buttons.length; num++) {
            const button = this.buttons[num];
            // Arbitrary button width and height to make sure they don't go out of bounds.
            const BUTTON_WIDTH = 150;
            const BUTTON_HEIGHT = 150;
            const top = Math.floor(Math.random() * (window.innerHeight - BUTTON_HEIGHT));
            const left = Math.floor(Math.random() * (window.innerWidth - BUTTON_WIDTH));
            button.btn.innerHTML = "";
            button.setLocation(`${top}px`, `${left}px`);
        }
    }

    /*
        Display buttons on the screen.
    */
    displayButtons() {
        document.getElementById("btnContainer").innerHTML = "";
        for (let num = 0; num < this.buttons.length; num++) {
            document.getElementById("btnContainer").appendChild(this.buttons[num].btn);
        }
    }

    /*
        Allow buttons to be clicked.
    */
    attachClickHandlers() {
        this.buttons.forEach(button => {
            button.btn.addEventListener("click", () => {
                this.clickOrder.push(button.id);
                for (let click = 0; click < this.clickOrder.length; click++) {
                    if (this.clickOrder[click] != click + 1) {
                        this.buttons.forEach(item => {
                            item.btn.innerHTML = item.id;
                        })
                        this.lose();
                    } else if (this.clickOrder.length == this.buttons.length) {
                        button.btn.innerHTML = button.id;
                        this.win();
                        break;
                    } else {
                        button.btn.innerHTML = button.id;
                    }
                }
            })
        });
    }

    win() {
        alert(MESSAGES.WIN);
        setTimeout(() => {
            this.resetGame();
        }, 2000);
    }

    lose() {
        alert(MESSAGES.LOSE);
        setTimeout(() => {
            this.resetGame();
        }, 2000);
    }

    /*
        Reset the game screen.
    */
    resetGame() {
        this.buttons = [];
        this.clickOrder = [];
        document.getElementById("btnContainer").innerHTML = "";
        document.getElementById("goBtnInput").value = "";
    }
}

// Start by creating a new game when page loads.
const BG = new ButtonGame();

// Button listener for the go button.
// DISCLAIMER: ChatGPT was used for the DOMContentLoaded event listener wrapper (however, not the code inside).
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("goBtn").addEventListener("click", function() {
        let requested = document.getElementById("goBtnInput").value;
        BG.createButtons(requested);
    });
});

document.getElementById("title").innerHTML = MESSAGES.TITLE;
document.getElementById("goBtn").value = MESSAGES.GO_BTN_VALUE;
document.getElementById("goBtnInputLabel").innerHTML = MESSAGES.GO_BTN_INPUT_LABEL;