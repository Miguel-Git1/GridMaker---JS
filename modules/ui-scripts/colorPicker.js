import { inputMapper } from "../inputs/InputMapper.js";
import { gameState } from "../../GameState.js";

export class ColorPicker {
    
    #currentColor = 0;

    #currentTimeStamp = 0;

    #colorContainer;

    #colorMap = new Map();

    #allColors = [
        "#FF0000", "#00FF00", "#0000FF", "#FFFFFF", "#000000",
        "#FF007F", "#7B2CBF", "#00F5D4", "#FFB703", "#FB8500", 
        "#4EA8DE", "#70E000", "#FF0055", "#3300FF", "#B5EAD7", 
        "#1F2833", "#E98074", "#264653", "#FFC6FF", "#45A29E",
        "#00F5D4"
    ];

    constructor() {
        this.#colorContainer = document.querySelector(".stroke-color-container");
    }

    get activeColor() {
        return this.#allColors[this.#currentColor];
    }

    get isOnCooldown() {
        return gameState.timestamp - this.#currentTimeStamp < 100;
    }

    get allColorSquares() {
        return this.#colorContainer.querySelectorAll(".color-block");
    }

        
        colors.forEach((color, i) => {
            const colorDiv = document.createElement("div");
            colorDiv.dataset.index = i;
            colorDiv.classList.add("color-block");
        {
            
            colorDiv.style.setProperty('--block-color', color);

    createColorSquare(colorCode, index) {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color-block");
        
        colorDiv.style.setProperty("--block-color", colorCode);

        colorDiv.dataset.index = index;

        colorDiv.classList.toggle("active", index === this.#currentColor);


        this.#colorMap.set(index, colorDiv);

        this.#colorContainer.appendChild(colorDiv);
    }
    
    setColor() {
        gameState.themeColor = this.activeColor;
    }

    buildColors() {   
        this.#allColors.forEach((color, i) => this.createColorSquare(color, i));
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