function randVal(upper) {
    // produce a random value with upper
    let output = Math.random();
    output *= upper ?? 1;
    output = Math.round(output)
    return output;
}

function makeRandRGB() {
    // create random formatted rgb values
    let redOutputValue = randVal(255);
    let greenOutputValue = randVal(255);
    let blueOutputValue = randVal(255);

    output = `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`;

    return output;
}

// defining new square outside of function
let newSquare = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//function for drawing square
function drawRect() {
    // deletes all children on the SVG canvas
    svg.replaceChildren();
    //make the square
    let rectWidth = 150;
    let rectHeight = 150;
    let rectFill = "none";
    newSquare.setAttribute("x", width/2 - (rectWidth/2));
    newSquare.setAttribute("y", height/2 - (rectHeight/2));
    newSquare.setAttribute("width", rectWidth);
    newSquare.setAttribute("height", rectHeight);
    newSquare.setAttribute("fill", rectFill);
    newSquare.setAttribute("stroke", "rgb(255,255,255)");
    newSquare.setAttribute("stroke-width", 2);
    svg.appendChild(newSquare);
}

// defining new circle outside of function
let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//function for drawing circle
function drawCircle() {
    // deletes all children on the SVG canvas
    svg.replaceChildren();
    //make the circle
    let circX = 150;
    let circY = 150;
    let circRad = 75;
    let circFill = "none";
    newCircle.setAttribute("cx", circX);
    newCircle.setAttribute("cy", circY);
    newCircle.setAttribute("r", circRad);
    newCircle.setAttribute("fill", circFill);
    newCircle.setAttribute("stroke", "rgb(255,255,255)");
    newCircle.setAttribute("stroke-width", 2);
    svg.appendChild(newCircle);
}

// defining new ellipse outside of function
let newEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
//function for drawing ellipse
function drawEllipse() {
    // deletes all children on the SVG canvas
    svg.replaceChildren();
    //make the ellipse
    let ellipX = 150;
    let ellipY = 150;
    let ellipRadX = 75;
    let ellipRadY = 50;
    let ellipFill = "none";
    newEllipse.setAttribute("cx", ellipX);
    newEllipse.setAttribute("cy", ellipY);
    newEllipse.setAttribute("rx", ellipRadX);
    newEllipse.setAttribute("ry", ellipRadY);
    newEllipse.setAttribute("fill", ellipFill);
    newEllipse.setAttribute("stroke", "rgb(255,255,255)");
    newEllipse.setAttribute("stroke-width", 2);   
    svg.appendChild(newEllipse);
}
