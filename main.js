import { grid } from "./modules/grid/grid.js";
import { gameState } from "./GameState.js";
import { inputActionManager } from "./modules/inputs/InputActionManager.js";
import { LayerManager } from "./modules/layers/layerManager.js"


const columnSlider = document.getElementById("grid-column-slider");
const rowSlider = document.getElementById("grid-row-slider");
const mousePosLabel = document.getElementById("mouse-pos-label");
const colorPicker = document.getElementById("stroke-color")

colorPicker.addEventListener("input", (e) => {
    gameState.themeColor = e.target.value;
});

const layerManager = new LayerManager();
const gridLayer = layerManager.createLayer("grid-layer");
const pixelLayer = layerManager.createLayer("pixel-layer");

;requestAnimationFrame(warmUp);

;function warmUp() {
    requestAnimationFrame(mainGameLoop);

    layerManager.upsertAllCanvasSize();
    
    grid.drawGrid(gridLayer.getContext("2d"));
}

;function mainGameLoop() {
    requestAnimationFrame(mainGameLoop);

    grid.changeGridDims(columnSlider.valueAsNumber, rowSlider.valueAsNumber);

    pixelLayer.getContext("2d").reset();

    grid.drawPositionedSquare(pixelLayer.getContext("2d"));
    
    grid.paintPositionedSquare(pixelLayer.getContext("2d"));

    mousePosLabel.textContent = `X: ${gameState.mousePosX} Y: ${gameState.mousePosY}`;

    inputActionManager.invokeInputs();
}
