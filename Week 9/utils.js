'use strict'; // <-- see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

// A utility function for creating a square to be added to an SVG
function square(x, y, size, colour) {
    // Use a rect element with identical width and height
    let square = document.createElementNS("http://www.w3.org/2000/svg", 'rect')

    // Set the attributes of the new square
    square.setAttribute('x', x);
    square.setAttribute('y', y);
    square.setAttribute('width', size);
    square.setAttribute('height', size);
    square.setAttribute('fill', makeRGB());

    return square;
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