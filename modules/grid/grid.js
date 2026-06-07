import { gameState } from "../../GameState.js";
import { SquareBucket } from "../../modules/grid/squareBucket.js"


class Grid {

    #columnWidth;
    #rowHeight;
    
    #squareBucket = new SquareBucket();

    constructor(rowHeight = 10, columnWidth = 10) {
        this.#rowHeight = rowHeight;
        this.#columnWidth = columnWidth;
    }

    get blueprintWidth() {
        return gameState.innerWidth;
    }

    get blueprintHeight() {
        return gameState.innerHeight;
    }

    get area() {
        this.blueprintWidth * this.blueprintHeight;
    }

    get areaIntersection() {
        const intersectWidth = -(this.#columnWidth - this.blueprintWidth);
        const intersectHeight = -(this.#rowHeight - this.blueprintHeight);

        return intersectWidth * intersectHeight;
    }

    get totals() {
        const totalColumns = Math.floor(this.blueprintWidth / this.#columnWidth);
        const totalRows = Math.floor(this.blueprintHeight / this.#rowHeight);

        return { totalColumns, totalRows };
    }
 
    clearPaintedSquares() {
        this.#squareBucket.clearPaintedSquares();
    }

    changeGridDims(columnWidth, rowHeight) {
        this.#columnWidth = columnWidth;
        this.#rowHeight = rowHeight;
    }

    getCurrentHoveredSquare() {
        const amountSquaresPassedY = Math.floor(gameState.mousePosX / this.#columnWidth);
        const amountSquaresPassedX = Math.floor(gameState.mousePosY / this.#rowHeight);

        const posX = amountSquaresPassedY * this.#columnWidth;
        const posY = amountSquaresPassedX * this.#rowHeight;

        return { x: posX, y: posY, width: this.#columnWidth, height: this.#rowHeight };
    }

    drawPositionedSquare(context) {
        const currentSquare = this.getCurrentHoveredSquare();
        context.fillRect(currentSquare.x, currentSquare.y, currentSquare.width, currentSquare.height);
    }

    paintPositionedSquare(context) {
        
        const hoveredSquare = this.getCurrentHoveredSquare();

        if (gameState.isMouseDown)
        {
            this.#squareBucket.storeSquareReference(hoveredSquare.x, hoveredSquare.y, hoveredSquare.width, hoveredSquare.height);
        }

        for (const [_, square] of this.#squareBucket) {
            context.fillRect(square.posX, square.posY, square.width, square.height);
        }
    }

    drawGrid(context) {
        const { totalColumns, totalRows } = this.totals;

        const totalWidthColumns = totalColumns * this.#columnWidth;
        const totalHeightRows = totalRows * this.#rowHeight;

        for (let i = 0; i <= totalWidthColumns; i += this.#columnWidth) {
            let nextPos = i + this.#columnWidth;

            context.beginPath()
            context.moveTo(nextPos, 0);
            context.lineTo(nextPos, this.blueprintHeight);
            context.stroke();
        }

        for (let j = 0; j <= totalHeightRows; j += this.#rowHeight) {
            let nextPos = j + this.#rowHeight;

            context.beginPath()
            context.moveTo(0, nextPos);
            context.lineTo(this.blueprintWidth, nextPos);
            context.stroke();
        }
    }
}

export const grid = new Grid();