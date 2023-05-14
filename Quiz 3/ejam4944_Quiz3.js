function randomInt(upper) {
    let output = Math.random();
    // the ?? 1 is to ensure if a null is found a number will be used instead
    output *= upper ?? 1;
    output = Math.round(output);
    return output;
}

function makeRGB(redInputValue, greenInputValue, blueInputValue ) {
    let redOutputValue = redInputValue ?? randomInt(255);
    let greenOutputValue = greenInputValue ?? randomInt(255);
    let blueOutputValue = blueInputValue ?? randomInt(255);

    return `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`;
}

//USER set fill colour using makeRGB function - shows on the top opaque polygon
let userFillColour = makeRGB(202,106,192);
console.log('user-set colour:')
console.log(userFillColour);
console.log('');

//USER set stroke colour using makeRGB function - shows on the top opaque polygon
let userStrokeColour = makeRGB(255,255,255);
console.log('user-set colour:')
console.log(userStrokeColour);
console.log('');


//FULLY random colour using makeRGB function
let randColour = makeRGB(null,null,null);
console.log('fully random colour:')
console.log(randColour);
console.log('');

//SEMI random colour sets using makeRGB function - set of 9
console.log('set of 9 semi-random colours:')
console.log()
let colour1 = makeRGB(100,null,null);
console.log(colour1);
let colour2 = makeRGB(null,100,null);
console.log(colour2);
let colour3 = makeRGB(null,null,100);
console.log(colour3);
let colour4 = makeRGB(0,0,null);
console.log(colour4);
let colour5 = makeRGB(0,null,0);
console.log(colour5);
let colour6 = makeRGB(null,0,0);
console.log(colour6);
let colour7 = makeRGB(150,150,null);
console.log(colour7);
let colour8 = makeRGB(150,null,150);
console.log(colour8);
let colour9 = makeRGB(null,150,150);
console.log(colour9);

//setting the size of the canvas with scaling
let canvScaler = 100;
let width = 10*canvScaler;
let height = 10*canvScaler;

//fetching the svg by its id, setting width and height
let svg = document.getElementById('base_svg');
svg.setAttribute('width', width);
svg.setAttribute('height', height);
console.log(svg);

//function for generating points for a polygon
function genPoints(p0,p1,p2,p3,p4,p5) {

    let _p0 = p0 ?? randomInt(height);
    let _p1 = p1 ?? randomInt(width) + ',' + randomInt(height);
    let _p2 = p2 ?? randomInt(width) + ',' + randomInt(height);
    let _p3 = p3 ?? randomInt(width) + ',' + randomInt(height);
    let _p4 = p4 ?? randomInt(width) + ',' + randomInt(height);
    let _p5 = p5 ?? randomInt(height);

    return `${_p0},${_p1},${_p2},${_p3},${_p4},${_p5}`;
}

//function for drawing polygonal shapes
function drawPolygon(o,c,st,sw,strd) {
    //the basic characteristics of the polygon
    //opacity
    let _o = o ?? Math.random();
    //c is fill colour
    let _c = c ?? randColour;
    //st is stroke colour
    let _st = st ?? randColour;
    //sw is stroke-width
    let _sw = sw ?? randomInt(20);
    //strd is stroke dash properties
    let _strd = strd ?? randomInt(10) + ',' + randomInt(15);

    let newPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    newPolygon.setAttribute('fill-opacity', _o);
    newPolygon.setAttribute('stroke-opacity', _o);
    newPolygon.setAttribute('fill', _c);
    newPolygon.setAttribute('stroke-width', _sw);
    newPolygon.setAttribute('stroke', _st);
    newPolygon.setAttribute('points', genPoints());
    newPolygon.setAttribute('stroke-dasharray', _strd)

    svg.appendChild(newPolygon);
}    

function makeBackgroundGrey() {
    let greyValue = randomInt(255);
    return `rgb(${greyValue},${greyValue},${greyValue})`;
}

//rectangle to provide background only
newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
svg.appendChild(newRect);
newRect.setAttribute('width', width);
newRect.setAttribute('height', height);
newRect.setAttribute('fill',makeBackgroundGrey());

//drawing polygons, adjust colours for user polygon further up, this polygon will sit on top with full opacity
drawPolygon(.03);
drawPolygon(.03);
drawPolygon(.04);
drawPolygon(.04);
drawPolygon(.05);
drawPolygon(.05);
drawPolygon(null,colour1);
drawPolygon(null,colour2);
drawPolygon(null,colour3);
drawPolygon(null,colour4);
drawPolygon(null,colour5);
drawPolygon(null,colour6);
drawPolygon(null,colour7);
drawPolygon(null,colour8);
drawPolygon(null,colour9);
drawPolygon(1,userFillColour,userStrokeColour);