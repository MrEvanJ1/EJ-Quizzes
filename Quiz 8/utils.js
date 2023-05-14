//this random function is overloaded:
//random will return a value between 0 and 1 (not including 1)
//random (upper) will return a value between 0 and upper (not including upper)
//random (lower, upper) will return a value between lower and upper (not including upper) 
function random() {
    switch(arguments.length) {
        case 0:
            return Math.random();
            break;
        case 1:
            return Math.random() * arguments[0];
            break;
        case 2:
            return arguments[0] + Math.random()*(arguments[1] - arguments[0]);
            break;
        default:
            console.log("too many arguments passed to random()");
            break;
    }
}


function makeRGB(redInputValue, greenInputValue, blueInputValue) {
    //Here, we test if there is a specific user input. If yes, then that value is assigned
    //to the output. Otherwise, a random value is generated. 
    let redOutputValue = redInputValue ?? Math.round(Math.random() * 255);
    let greenOutputValue = greenInputValue ?? Math.round(Math.random() * 255);
    let blueOutputValue = blueInputValue ?? Math.round(Math.random() * 255);
    //Now we define a string and pass these output values into a string. 
    return `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`
}





// This function creates a white circle SVG element
// Input:
//    x - the x-position
//    y - the y-position
//    radius - the radius of the circle
function makeCircle(x, y, radius) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", makeRGB());
    circle.setAttribute("opacity", random(0.05,0.7));
    circle.setAttribute("stroke", makeRGB())
    circle.setAttribute("stroke-width", random(width* 0.001, width *0.009));
    return circle;
  }