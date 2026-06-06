// For now just subtracts a flatten arrray.
Object.defineProperty(Array.prototype, "subtractEach", {
    value: function(array) {
        if (array.length !== this.length)
        {
            console.warn("Illegal subtracting: Different dims.");
            return undefined;
        }

        const resultArray = [];

        this.forEach((element, i) => {
            let guestValue = array[i];

            resultArray.push(element - guestValue);
        })

        return resultArray;
    },
    enumerable: false
});

Object.defineProperty(Array.prototype, "equals", {
    value: function(array) {
        if (!Array.isArray(array)) {
            console.warn("The provided object is not an array.");
            return false;
        }

        return this.every((el, index) => el === array[index]);
    },
    enumerable: false
});