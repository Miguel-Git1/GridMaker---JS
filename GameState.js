class GameState { 
    mousePosX;
    mousePosY;

    innerWidth;
    innerHeight;

    isMouseDown;

    themeColor;

    #hookMouseTrack() {
        document.addEventListener("mousemove", (e) => {
            this.mousePosX = e.clientX;
            this.mousePosY = e.clientY;
        });
    }

    #hookMouseInputs() {
        document.addEventListener("mousedown", () => {
            this.isMouseDown = true;
        });

        document.addEventListener("mouseup", () => {
            this.isMouseDown = false;
        });
    }

    constructor() {
        this.#hookMouseTrack();
        this.#hookMouseInputs();
    }

}


export const gameState = new GameState();