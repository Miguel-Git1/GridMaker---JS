import { grid } from "./modules/grid/grid.js";
import { gameState } from "./GameState.js";
import { inputActionManager } from "./modules/Inputs/InputActionManager.js";


const canvas = document.getElementById("mycanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

const columnSlider = document.getElementById("grid-column-slider");
const rowSlider = document.getElementById("grid-row-slider");
const mousePosLabel = document.getElementById("mouse-pos-label");
const colorPicker = document.getElementById("stroke-color")

colorPicker.addEventListener("input", (e) => {
    gameState.themeColor = e.target.value;
    console.log(e.target.value);
})

;requestAnimationFrame(mainGameLoop);

;function mainGameLoop() {
    requestAnimationFrame(mainGameLoop);

    gameState.innerWidth = window.innerWidth;
    gameState.innerHeight = window.innerHeight;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.reset();

    context.fillStyle = gameState.themeColor;

    grid.changeGridDims(columnSlider.valueAsNumber, rowSlider.valueAsNumber);

    grid.drawGrid(context)

    grid.drawPositionedSquare(context);

    grid.paintPositionedSquare(context);

    mousePosLabel.textContent = `X: ${gameState.mousePosX} Y: ${gameState.mousePosY}`;

    inputActionManager.invokeInputs();
}
