

export function drawSquare(context, squareDims) {
    context.fillStyle = "red";
    
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    const squareXPos = halfWidth - squareDims[0] / 2;
    const squareYPos = halfHeight - squareDims[1] / 2

    context.fillRect(squareXPos, squareYPos, squareDims[0], squareDims[1]);

    return { width: squareDims[0], height: squareDims[1], x: squareXPos, y: squareYPos };
}