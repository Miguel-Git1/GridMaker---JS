class GameState { 
    mousePosX = 0;
    mousePosY = 0;

    innerWidth;
    innerHeight;

    isMouseDown;

    themeColor;

    timestamp;

    #upsertDims() {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
    }

    constructor() {
        this.#upsertDims();
    }

}


export const gameState = new GameState();