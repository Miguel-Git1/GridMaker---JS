import { gameState } from "../../GameState.js";

export class HoverBrush {

    static incrementCooldown = 150;

    #currentGrid;
    #context;

    #extraWidth = 1;
    #extraHeight = 1;

    constructor(context, grid) {
        this.#currentGrid = grid;
        this.#context = context;
    }

    incrementWidth() {
        this.#extraWidth++;
    }

    incrementHeight() {
        this.#extraHeight++;
    }

    decrementWidth() {
        this.#extraWidth = Math.max(0, this.#extraWidth - 1);
    }

    decrementHeight() {
        this.#extraHeight = Math.max(0, this.#extraHeight - 1);
    }


    upscaleBrush(width, height, type = "cross") {
        if (type === "cross")
        {
            
        }
        throw new NotImplementedException("This funcionality is not implemented yet.");
    }

    *getCurrentHoveredSquare() {
        const amountSquaresPassedX = Math.floor(gameState.mousePosX / this.#currentGrid.columnWidth);
        const amountSquaresPassedY = Math.floor(gameState.mousePosY / this.#currentGrid.rowHeight);

        const posX = amountSquaresPassedX * this.#currentGrid.columnWidth; 
        const posY = amountSquaresPassedY * this.#currentGrid.rowHeight;

        yield { x: posX, y: posY, width: this.#currentGrid.columnWidth, height: this.#currentGrid.rowHeight } // Center square
        
        for (let i = 0; i < this.#extraWidth; i++) {
            const amountExtraSquareX = i * this.#currentGrid.columnWidth;

            yield { x: posX - amountExtraSquareX, y: posY, width: this.#currentGrid.columnWidth, height: this.#currentGrid.rowHeight };
            yield { x: posX + amountExtraSquareX, y: posY, width: this.#currentGrid.columnWidth, height: this.#currentGrid.rowHeight };
        }

        for (let j = 0; j < this.#extraHeight; j++) {
            const amountExtraSquareY = j * this.#currentGrid.rowHeight;

            yield { x: posX, y: posY - amountExtraSquareY, width: this.#currentGrid.columnWidth, height: this.#currentGrid.rowHeight };
            yield { x: posX, y: posY + amountExtraSquareY, width: this.#currentGrid.columnWidth, height: this.#currentGrid.rowHeight };
        }
    }

    drawHoveredSquare() {
        const currentSquares = this.getCurrentHoveredSquare();

        for (const hoveredSquare of currentSquares) {
            this.#context.fillRect(hoveredSquare.x, hoveredSquare.y, hoveredSquare.width, hoveredSquare.height);
        }
    }

    paintPositionedSquare() {
        if (gameState.isMouseDown)
        {
            const currentSquares = this.getCurrentHoveredSquare();

            for (const hoveredSquare of currentSquares) {
                this.#currentGrid.drawSquare(hoveredSquare.x, hoveredSquare.y, hoveredSquare.width, hoveredSquare.height);
            }
        } 
    }

}