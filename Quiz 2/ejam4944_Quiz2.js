

let rectangle = document.getElementById('rect1');
console.log(rectangle);

// rectangle and rectangle 1 have randomised positions, dimensions and colour as well as corner roundedness
rectangle.setAttribute("x", Math.round(Math.random() * 650));
rectangle.setAttribute("y", Math.round(Math.random() * 400));
rectangle.setAttribute("width", Math.round(Math.random() * 350));
rectangle.setAttribute("height", Math.round(Math.random() * 600));
rectangle.setAttribute("rx", Math.round(Math.random() * 50));
rectangle.setAttribute("ry", Math.round(Math.random() * 50));

let r = Math.round(Math.random() * 255);
let g = Math.round(Math.random() * 255);
let b = Math.round(Math.random() * 255);
rectangle.setAttribute('fill', `rgb(${r}, ${g}, ${b})`);

const svg = document.getElementById("mainSvg");
console.log(svg);

let newRectangle1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
newRectangle1.setAttribute("x", Math.round(Math.random() * 650));
newRectangle1.setAttribute("y", Math.round(Math.random() * 400));
newRectangle1.setAttribute("width", Math.round(Math.random() * 350));
newRectangle1.setAttribute("height",Math.round(Math.random() * 600));
newRectangle1.setAttribute("rx", Math.round(Math.random() * 50));
newRectangle1.setAttribute("ry", Math.round(Math.random() * 50));
let r1 = Math.round(Math.random() * 255);
let g1 = Math.round(Math.random() * 255);
let b1 = Math.round(Math.random() * 255);
newRectangle1.setAttribute('fill', `rgb(${r1}, ${g1}, ${b1})`);
svg.appendChild(newRectangle1);

// two potentially large and frequently overlapping circles with hued pale greys and low opacity
let newCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
newCircle1.setAttribute("cx", Math.round(Math.random() * 1000));
newCircle1.setAttribute("cy", Math.round(Math.random() * 1000));
newCircle1.setAttribute("r", Math.round(Math.random() * 1000));
newCircle1.setAttribute("opacity", Math.random() *0.1 + .05);
let r2 = Math.round(Math.random() * 255);
let g2 = Math.round(Math.random() * 100);
let b2 = Math.round(Math.random() * 100);
newRectangle1.setAttribute('fill', `rgb(${r2}, ${g2}, ${b2})`);
svg.appendChild(newCircle1);

let newCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
newCircle2.setAttribute("cx", Math.round(Math.random() * 1000));
newCircle2.setAttribute("cy", Math.round(Math.random() * 1000));
newCircle2.setAttribute("r", Math.round(Math.random() * 1000));
newCircle2.setAttribute("opacity", Math.random() *0.1 + .05);
let r3 = Math.round(Math.random() * 100);
let g3 = Math.round(Math.random() * 100);
let b3 = Math.round(Math.random() * 255);
newRectangle1.setAttribute('fill', `rgb(${r3}, ${g3}, ${b3})`);
svg.appendChild(newCircle2);

// polyline with randomisation on point positions, width and dash properties
let polyline1 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
polyline1.setAttribute('stroke-width', Math.round(Math.random() * 20));
polyline1.setAttribute('fill', 'none');
polyline1.setAttribute('stroke-linecap', 'round');
let dash1 = Math.round(Math.random() * Math.round(Math.random() * 50))
let dash2 = Math.round(Math.random() * Math.round(Math.random() * 35))
polyline1.setAttribute('stroke-dasharray', `${dash1}, ${dash2}` );
let pStart = Math.round(Math.random() * 1000);
let p1x = Math.round(Math.random() * 1000);
let p1y = Math.round(Math.random() * 1000);
let p2x = Math.round(Math.random() * 1000);
let p2y = Math.round(Math.random() * 1000);
let p3x = Math.round(Math.random() * 1000);
let p3y = Math.round(Math.random() * 1000);
polyline1.setAttribute('points', `${pStart}, ${p1x} ${p1y}, ${p2x} ${p2y}, ${p3x} ${p3y}, ${pStart} )`);
let r4 = 200;
let g4 = Math.round(Math.random() * 255);
let b4 = 200;
polyline1.setAttribute('stroke', `rgb(${r4}, ${g4}, ${b4})`);
svg.appendChild(polyline1);

// attempt to get the svg background to change to random (dim) values unsure why this didnt work
// let r2 = Math.round(Math.random() * 150);
// let g2 = Math.round(Math.random() * 150);
// let b2 = Math.round(Math.random() * 150);
// let a2 = Math.round(Math.random() *100 / 100);
// svg.setAttribute('background-color', `rgba(${r2}, ${g2}, ${b2}, ${a2})`);