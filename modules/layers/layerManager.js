class LayerManager {
    
    #layerContainer;
    #layerMapper = new Map();

    constructor() {
        this.#layerContainer = document.getElementById("layer-container");
    }

    createLayer(name) {
        const newCanvas = document.createElement("canvas");
        newCanvas.id = name;
        newCanvas.dataset.index = this.#layerMapper.size + 1;

        this.#layerMapper.set(name, newCanvas);

        this.#layerContainer.insertBefore(newCanvas, null);

        return newCanvas;
    }

    fetchLayerContext(name)
    {
        const targetCanvas = this.#layerMapper.get(name);

        return targetCanvas.getContext("2d");
    }

    upsertAllCanvasSize() {
        for (const [id, canvas] of this.#layerMapper) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
}

export const layerManager = new LayerManager();