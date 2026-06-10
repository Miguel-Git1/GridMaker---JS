import { inputMapper } from "./InputMapper.js"
import { layerManager } from "../layers/layerManager.js";
import { gameState } from "../../GameState.js";
import { HoverBrush } from "../grid/hoverBrush.js";

// I am not liking where this is going... If this class holds all the actions, you will end up with millions of imports.
class InputActionManager {
    
    incrementTimeStamp = 0;

    clearPaintedSquares(grid) {
        if (inputMapper.isKeyPressed("Escape")) {
            grid.clearPaintedSquares();
        }
    }

    changeHoverBrushSize(hoverBrush) {
        if (inputMapper.isKeyPressed("+")) {
            
            if (gameState.timestamp - this.incrementTimeStamp < HoverBrush.incrementCooldown)
            {
                return;
            }
                
            this.incrementTimeStamp = gameState.timestamp;
            hoverBrush.incrementWidth();
            hoverBrush.incrementHeight();
        }

        if (inputMapper.isKeyPressed("-")) {

            if (gameState.timestamp - this.incrementTimeStamp < HoverBrush.incrementCooldown)
            {
                return;
            }
                
            this.incrementTimeStamp = gameState.timestamp;

            hoverBrush.decrementWidth();
            hoverBrush.decrementHeight();
        }


    }
}

export const inputActionManager = new InputActionManager();