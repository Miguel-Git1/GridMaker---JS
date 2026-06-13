import { Grid } from "./modules/grid/grid.js";
import { gameState } from "./GameState.js";
import { inputActionManager } from "./modules/inputs/InputActionManager.js";
import { layerManager } from "./modules/layers/layerManager.js";
import { HoverBrush } from "./modules/grid/hoverBrush.js";
import { ColorPicker } from "./modules/ui-scripts/colorPicker.js";

const columnSlider = document.getElementById("grid-column-slider");
const rowSlider = document.getElementById("grid-row-slider");
const mousePosLabel = document.getElementById("mouse-pos-label");

const gridLayer = layerManager.createLayer("grid-layer");
const hoverLayer = layerManager.createLayer("hover-layer");
const pixelLayer = layerManager.createLayer("pixel-layer");

const gridLayerContext = gridLayer.getContext("2d");
const hoverLayerContext = hoverLayer.getContext("2d");
const pixelLayerContext = pixelLayer.getContext("2d");

const grid = new Grid(pixelLayerContext);
const hoverBrush = new HoverBrush(hoverLayerContext, grid);

const colorPicker = new ColorPicker(hoverLayerContext);

;requestAnimationFrame(warmUp);

;function warmUp() {
    requestAnimationFrame(mainGameLoop);

    layerManager.upsertAllCanvasSize();
    
    grid.drawGrid(gridLayerContext);

    colorPicker.setColor();
    colorPicker.buildColors();
    colorPicker.setColorSquareEvents();

    colorPicker.makeAnimationSquares();
}

;function mainGameLoop(timestamp) {
    requestAnimationFrame(mainGameLoop);

    gameState.timestamp = timestamp;

    grid.changeGridDims(columnSlider.valueAsNumber, rowSlider.valueAsNumber);
    
    hoverLayerContext.reset();
    
    pixelLayerContext.fillStyle = gameState.themeColor;
    
    hoverLayerContext.fillStyle = gameState.themeColor;

    hoverBrush.drawHoveredSquare();
    
    hoverBrush.paintPositionedSquare();
    
    mousePosLabel.textContent = `X: ${gameState.mousePosX} Y: ${gameState.mousePosY}`;
    
    inputActionManager.clearPaintedSquares(grid);
    
    inputActionManager.changeHoverBrushSize(hoverBrush);    
    
    colorPicker.switchColorAction();
}
