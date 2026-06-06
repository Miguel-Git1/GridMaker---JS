export class SquareBucket {

    #table = new Map();

    [Symbol.iterator]() {
        return this.#table[Symbol.iterator]();
    }


    #getSquareRefType(x, y, width, height) {
        const squareReference = this.#getSquareReferenceType(x, y, width, height);

        const uniqueID = `${squareReference.posX},${squareReference.posY},${squareReference.width},${squareReference.height}`;

        return { uniqueID, squareReference };
    }

    storeSquareReference(x, y, width, height) {
        const { uniqueID, squareReference } = this.#getSquareRefType(x, y, width, height);

        this.#table.set(uniqueID, squareReference);
    }   

    getSquare(x, y, width, height) {
        const { uniqueID, squareReference } = this.#getSquareRefType(x, y, width, height);

        return this.#table.get(uniqueID);
    }

    #getSquareReferenceType(x, y, width, height, color = "rgb(255, 0, 0)") {
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
}