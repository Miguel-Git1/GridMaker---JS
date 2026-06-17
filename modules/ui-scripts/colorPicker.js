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

    #colorBlockClassName = "color-block";

    constructor() {
        this.#colorContainer = document.querySelector(".stroke-color-container");
    }

    get activeColor() {
        return this.#allColors[this.#currentColor];
    }

    get isOnCooldown() {
        return gameState.timestamp - this.#currentTimeStamp < 200;
    }

    get allColorSquares() {
        return this.#colorContainer.querySelectorAll(`.${this.#colorBlockClassName}`);
    }

    async makeAnimationSquares() {
        this.clearAllActives();

        const allOrderesSquares = this.allColorSquares;

        let middleNumber = Math.floor(allOrderesSquares.length / 2);
        
        let leftIndex = middleNumber;
        let rightIndex = middleNumber;

        let scalar = 1;
        let step = 0;

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < allOrderesSquares.length; i++)
        {
            const leftSquare = this.#colorMap.get(leftIndex);
            const rightSqure = this.#colorMap.get(rightIndex);

            
            leftSquare.classList.toggle("active");
            rightSqure.classList.toggle("active");
            
            leftIndex = middleNumber - scalar;
            rightIndex = middleNumber + scalar;

            step = (step %   2) + 1;

            if (step == 2)
            {
                scalar++;
            }

            await sleep(250);

            leftSquare.classList.toggle("active");
            rightSqure.classList.toggle("active");
        }
    }

    clearAllActives() {
        this.allColorSquares.forEach(c => c.classList.remove("active"));
    }

    setColorSquareEvents() {
        this.allColorSquares.forEach(c => c.addEventListener("click", () => {
            this.changeColor(+c.dataset.index);
        }));
    }
 
    changeColor(index) {
        this.allColorSquares.forEach(c => c.classList.toggle("active", index === +c.dataset.index));

        this.#currentColor = index;
        gameState.themeColor = this.activeColor;
    }

    createColorSquare(colorCode, index) {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add(this.#colorBlockClassName);
        
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
                nextColorIndex = (index - 1 + limit) % limit;
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