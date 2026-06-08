
/**
 * @deprecated Since the introduction of layers there isnt a clear motive for using this.
 */
export class SquareBucket {

    #table = new Map();

    [Symbol.iterator]() {
        return this.#table[Symbol.iterator]();
    }

    #getSquareRefType(x, y, width, height, color) {
        const squareReference = this.#getSquareReferenceType(x, y, width, height, color);

        const uniqueID = `${squareReference.posX},${squareReference.posY},${squareReference.width},${squareReference.height}`;

        return { uniqueID, squareReference };
    }

    #getSquareReferenceType(x, y, width, height, color) {
        /**
         * @type {import('../../types').SquareReference}
         */
        return {
            posX: x,
            posY: y,
            width: width,
            height: height,
            color: color
        }
    }

    clearPaintedSquares() {
        this.#table.clear();
    }

    storeSquareReference(x, y, width, height, color) {
        const { uniqueID, squareReference } = this.#getSquareRefType(x, y, width, height, color);

        this.#table.set(uniqueID, squareReference);
    }   

    getSquare(x, y, width, height, color) {
        const { uniqueID, squareReference } = this.#getSquareRefType(x, y, width, height, color);

        return this.#table.get(uniqueID);
    }
}