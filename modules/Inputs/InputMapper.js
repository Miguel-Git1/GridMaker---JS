
// For some reason mozilla is saying not to use e.keyCode and use e.key
class InputMapper {

    #pressedKeysMapper = new Map();

    #setKeyDownTracker() {
        document.addEventListener("keydown", (e) => {
            this.#pressedKeysMapper.set(e.key, true);
        });  
    }

    #setKeyReleaseTracker() {
        document.addEventListener("keyup", (e) => {
            this.#pressedKeysMapper.delete(e.key);
        });
    }

    constructor() {
        this.#setKeyDownTracker(); 
        this.#setKeyReleaseTracker();
    }

    isKeyPressed(key) {
        return this.#pressedKeysMapper.has(key);
    }

}

export const inputMapper = new InputMapper();

