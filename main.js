import { Grid } from "./modules/grid/grid.js";
import { gameState } from "./GameState.js";
import { inputActionManager } from "./modules/inputs/InputActionManager.js";
import { layerManager } from "./modules/layers/layerManager.js"

const columnSlider = document.getElementById("grid-column-slider");
const rowSlider = document.getElementById("grid-row-slider");
const mousePosLabel = document.getElementById("mouse-pos-label");
const colorPicker = document.getElementById("stroke-color")

const gridLayer = layerManager.createLayer("grid-layer");
const hoverLayer = layerManager.createLayer("hover-layer");
const pixelLayer = layerManager.createLayer("pixel-layer");

const gridLayerContext = gridLayer.getContext("2d");
const hoverLayerContext = hoverLayer.getContext("2d");
const pixelLayerContext = pixelLayer.getContext("2d");

const grid = new Grid(pixelLayerContext);

;requestAnimationFrame(warmUp);

;function warmUp() {
    requestAnimationFrame(mainGameLoop);

    layerManager.upsertAllCanvasSize();
    
    grid.drawGrid(gridLayerContext);
}

;function mainGameLoop(timestamp) {
    requestAnimationFrame(mainGameLoop);

    gameState.timestamp = timestamp;
    gameState.themeColor = colorPicker.value;

    grid.changeGridDims(columnSlider.valueAsNumber, rowSlider.valueAsNumber);
    
    hoverLayerContext.reset();
    
    hoverLayerContext.fillStyle = gameState.themeColor;

    hoverBrush.drawHoveredSquare();
    
    pixelLayerContext.fillStyle = gameState.themeColor;

    hoverBrush.paintPositionedSquare();

    mousePosLabel.textContent = `X: ${gameState.mousePosX} Y: ${gameState.mousePosY}`;

    inputActionManager.clearPaintedSquares(grid);
}
