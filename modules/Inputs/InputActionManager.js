import { inputMapper } from "./InputMapper.js"
import { layerManager } from "../layers/layerManager.js";

// I am not liking where this is going... If this class holds all the actions, you will end up with millions of imports.
class InputActionManager {
    
    clearPaintedSquares(grid) {
        if (inputMapper.isKeyPressed("Escape"))
        {
            grid.clearPaintedSquares();
        }
    }
}

export const inputActionManager = new InputActionManager();