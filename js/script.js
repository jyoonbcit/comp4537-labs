// Author: Jihoon Yoon
// A01322277

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
        this.btn.setAttribute("id", `btn${order}`);
        this.btn.setAttribute("style", `background-color:${color}; width:${width}; height:${height}; top:${top}; left:${left}; position:absolute;`);
        this.btn.innerHTML = order;
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
    }

    /*
        Start the game by creating buttons.
        :param requested: The number of buttons to create.
    */
    createButtons(requested) {
        this.resetGame();
        for (let num = 1; num <= requested; num++) {
            // TODO: Make sure they generate in bounds. Currently they do, but I don't know why...
            let button = new Button(num, this.generateRandomColor(), "10em", "5em", "7em", `${10*(num - 1) + 1}em`);
            this.buttons.push(button);
        }
        this.displayButtons();
        this.shuffleButtons();
    }

    /*
        Generate a random RGB color string.
    */
    generateRandomColor() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    /*
        Shuffle buttons around boundaries of the browser window.
    */
    shuffleButtons() {
        // We use () => {} instead of function() {} because function() creates its own scope and we want to use the scope of the class.
        setInterval(() => {
            // TODO: Remove console.log
            console.log("Shuffling buttons...");
            for (let num = 0; num < this.buttons.length; num++) {
                let top = 100 - Math.floor(Math.random() * 100);
                let left = 100 - Math.floor(Math.random() * 100);
                let button = this.buttons[num];
                button.setLocation(`${top}%`, `${left}%`);
            }
        }, 1000*this.buttons.length);
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
        Reset the game screen.
    */
    resetGame() {
        this.buttons = [];
        document.getElementById("btnContainer").innerHTML = "";
        document.getElementById("goBtnInput").value = "";
    }
}
