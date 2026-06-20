
import { gameState } from "../../GameState.js";

// For some reason mozilla is saying not to use e.keyCode and use e.key
class InputMapper {

    #pressedKeysMapper = new Set();

    #setKeyDownTracker() {
        document.addEventListener("keydown", (e) => {

            if (e.key === "Tab")
            {
                e.preventDefault();
            }
            
            this.#pressedKeysMapper.add(e.key);
        });  
    }

    #setKeyReleaseTracker() {
        document.addEventListener("keyup", (e) => this.#pressedKeysMapper.delete(e.key));
    }

    #setMouseTracker() {
        document.addEventListener("mousedown", () => gameState.isMouseDown = true);

        document.addEventListener("mouseup", () => gameState.isMouseDown = false);

        document.addEventListener("mousemove", (e) => {
            gameState.mousePosX = e.clientX;
            gameState.mousePosY = e.clientY;
        });
    }

    constructor() {
        this.#setKeyDownTracker(); 
        this.#setKeyReleaseTracker();
        this.#setMouseTracker();
    }

    // This is just used for debugging
    get currentKeys() {
        return this.#pressedKeysMapper;
    }
    
    isKeyPressed(...keys) {
        return keys.every(key => this.#pressedKeysMapper.has(key));
    }
}

export const inputMapper = new InputMapper();

