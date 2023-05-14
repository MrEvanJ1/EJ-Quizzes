// fetching the buttons for generating shapes and random RGB colours
const rectButton = document.getElementById("rect-button");
const circleButton = document.getElementById("circle-button");
const ellipseButton = document.getElementById("ellipse-button");
const randRGB_button = document.getElementById("randomColour-button");
randRGB_buttonDiv = document.getElementById("button-div-randomColour");

//fetching the svg canvas
const svg = document.getElementById("svg-canvas");
let width = 300;
let height = 300;
svg.style.width = width;
svg.style.height = height;

//draw square when "generate square" button is pressed
rectButton.addEventListener("click", function(e) {
    drawRect();
    randRGB_buttonDiv.style.backgroundColor="rgb(127,127,127)";
} );

//draw circle when "generate circle" button is pressed
circleButton.addEventListener("click", function(e) {
    drawCircle();
    randRGB_buttonDiv.style.backgroundColor="rgb(127,127,127)";
} );

//draw ellipse when "generate ellipse" button is pressed
ellipseButton.addEventListener("click", function(e) {
    drawEllipse();
    randRGB_buttonDiv.style.backgroundColor="rgb(127,127,127)";
} );

/* add randomised fill colour to the current shape on the SVG canvas when "generate random colour" button is pressed
also adds same random colour to the div holding the "generate random colour" button */
randRGB_button.addEventListener("click", function(e) {
    let childShape = svg.firstChild;
    let randColour = makeRandRGB();
    childShape.setAttribute("fill", randColour);
    randRGB_buttonDiv.style.backgroundColor=randColour;
} );





