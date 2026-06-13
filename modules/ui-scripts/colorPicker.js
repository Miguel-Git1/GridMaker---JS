import { inputMapper } from "../inputs/InputMapper.js";

export class ColorPicker {
    
    #colorContainer;
    #currentColor;

    constructor() {
        this.#colorContainer = document.querySelector(".stroke-color-container");
    }

    buildColors() {
        const colors = ["#FF0000", "#008000", "#ADD8E6", "#FFFF00", "#FF00FF"];
        
        colors.forEach((color, i) => {
            const colorDiv = document.createElement("div");
            colorDiv.dataset.index = i;
            colorDiv.classList.add("color-block");
            
            colorDiv.style.setProperty('--block-color', color);

            this.#colorContainer.appendChild(colorDiv);
        });
    }

    switchColorAction() {
        const targetKeysArePressed = inputMapper.isKeyPressed("Shift", "Tab") || inputMapper.isKeyPressed("Tab");

        if (targetKeysArePressed && !this.isOnCooldown)
        {
            this.#currentTimeStamp = gameState.timestamp;

            const limit = this.#allColors.length; 

            const index = this.#currentColor;

            let nextColorIndex;
            if (inputMapper.isKeyPressed("Shift", "Tab"))
            {
                const calculatedColorIndex = Math.max(0, (index - 1)) % limit; 
                nextColorIndex = calculatedColorIndex === 0 ? limit - 1 : calculatedColorIndex;
            }
            else 
            {
                nextColorIndex = (this.#currentColor + 1) % limit; 
            }

            this.#currentColor = nextColorIndex;

            this.changeColor(nextColorIndex);
            
            gameState.themeColor = this.activeColor;
        }
    }
}