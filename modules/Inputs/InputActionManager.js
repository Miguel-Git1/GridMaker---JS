import { inputMapper } from "./InputMapper.js"

import { grid } from "../grid/grid.js";

// I am not liking where this is going... If this class holds all the actions, you will end up with millions of imports.
class InputActionManager {
    
    #clearPaintedSquares() {
        if (inputMapper.isKeyPressed("Escape"))
        {
            grid.clearPaintedSquares();
        }
    }

    invokeInputs() {
        this.#clearPaintedSquares();
    }
}

export const inputActionManager = new InputActionManager();