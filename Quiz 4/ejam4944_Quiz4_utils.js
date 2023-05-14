// Function for randomly generating only even values between 0 and 255
function evenRGBValue() {
    let n = Math.round(Math.random() *255);
    if (n %2 == 0)  {
        return n;
    } else if (n === 255) { 
        n--;
    } else {
        n++;
    }
    return n;
}

// Function for randomly generating only odd values between 0 and 255
function oddRGBValue() {
    let n = Math.round(Math.random() *255);
    if (n %2 == 1)  {
        return n;
    } else if (n === 0) { 
        n++;
    } else {
        n--;        
    }
    return n;
}

// Function for randomly generating formatted RGB values where each value is even
function makeEvenRGB() {
    let redOutputValue = evenRGBValue();
    let greenOutputValue = evenRGBValue();
    let blueOutputValue = evenRGBValue();
    return `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`;
}

// Function for randomly generating formatted RGB values where each value is odd
function makeOddRGB() {
    let redOutputValue = oddRGBValue();
    let greenOutputValue = oddRGBValue();
    let blueOutputValue = oddRGBValue();
    return `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`;
}

//variables for ellipse rx and ry starting values
let startEvenEllipseRx = 350
let startEvenEllipseRy = 340
let startOddEllipseRx = 330
let startOddEllipseRy = 320

//function for drawing ellipses which will appear on even runs of the for loop, using even RGB values
function drawEvenRGBEllipse(rx,ry) {
    let newEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    newEllipse.setAttribute("cx", 500);
    newEllipse.setAttribute("cy", 500);
    newEllipse.setAttribute("rx", startEvenEllipseRx);
    newEllipse.setAttribute("ry", startEvenEllipseRy);
    newEllipse.setAttribute("fill", makeEvenRGB());
    newEllipse.setAttribute("fill-opacity", Math.random());
    svg.appendChild(newEllipse);
}

//function for drawing ellipses which will appear on odd runs of the for loop, using odd RGB values
function drawOddRGBEllipse(rx,ry) {
    let newEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    newEllipse.setAttribute("cx", 500);
    newEllipse.setAttribute("cy", 500);
    newEllipse.setAttribute("rx", startOddEllipseRx);
    newEllipse.setAttribute("ry", startOddEllipseRy);
    newEllipse.setAttribute("fill", makeOddRGB());
    newEllipse.setAttribute("fill-opacity", Math.random());
    svg.appendChild(newEllipse);
}