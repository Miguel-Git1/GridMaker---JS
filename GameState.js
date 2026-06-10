class GameState { 
    mousePosX;
    mousePosY;

    innerWidth;
    innerHeight;

    isMouseDown;

    themeColor;

    timestamp;

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

    #upsertDims() {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
    }

    constructor() {
        this.#hookMouseTrack();
        this.#hookMouseInputs();
        this.#upsertDims();
    }

}


export const gameState = new GameState();