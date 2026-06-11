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
        if (inputMapper.isKeyPressed("tab"))
        {
            this.#currentColor
        }
    }
}