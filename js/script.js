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
