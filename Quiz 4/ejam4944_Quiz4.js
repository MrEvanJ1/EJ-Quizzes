// fetching SVG element by ID
const svg = document.getElementById('baseSVG');

// variables for size of SVG
let height = 1000;
let width = 1000;

svg.setAttribute("height", height);
svg.setAttribute("width", width);


/*for loop switching between drawing ellipses with alternating Random even or odd RGB values. Includes some random
variations on the rx and ry values for each new ellipse which are also scaled using the loop's i value
*/
for (let i=0; i<11; i++) {
    let newEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    if (i%2 == 0){
        newEllipse.setAttribute("fill", makeEvenRGB());
        drawEvenRGBEllipse();
        startEvenEllipseRx = startEvenEllipseRx - (50 + Math.round(Math.random()*(i*4)));
        startEvenEllipseRy = startEvenEllipseRy - (50 + Math.round(Math.random()*(i*4)));
        console.log("This loop iteration " + i +  " is even, with even RGB values");
    } else {
        newEllipse.setAttribute("fill", makeOddRGB());
        drawOddRGBEllipse();
        startOddEllipseRx = startOddEllipseRx - (50 + Math.round(Math.random()*(i*4)));
        startOddEllipseRy = startOddEllipseRy - (50 + Math.round(Math.random()*(i*4)));
        console.log("This loop iteration " + i + " is odd, with odd RGB values");
    }
}

