const svg = document.getElementById("svg-canvas");

window.addEventListener("resize", resizeSvg);

let bbox = svg.getBoundingClientRect();

//provide responsive qualities to the SVG canvas
function resizeSvg(){
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
}

function resizeSvg(){
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
    
    for(let circle of svg.children){
        circle.setAttribute('r',  Math.min(bbox.width, bbox.height) * 0.1);
    }
}

resizeSvg();

let width = window.innerWidth;
let height = window.innerHeight;

//2d grid data structure--------------------------------------------------------------------------

//number of columns and rows
let res = Math.round(random(2,10));
let numCols = res;
let numRows = res;

//storage for all cells
let gridArray = [];

for (let x = 0; x < numCols; x++) {
    gridArray[x] = [];
    for (let y = 0; y < numRows; y++){
        gridArray[x][y] = Math.round(random());
    }
}

//function for creating cells and giving them proportions to match the SVG canvas

function makeCell(x, y) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    let cellWidth = bbox.width/numCols;
    let cellHeight = bbox.height/numRows;
    rect.setAttribute('x', x * cellWidth);
    rect.setAttribute('y', y * cellHeight);
    rect.setAttribute('width', cellWidth);
    rect.setAttribute('height', cellHeight);
    rect.setAttribute('fill', makeRGB());
    rect.setAttribute('fill-opacity', random(0.1,0.6))
    svg.appendChild(rect);    
}

/*function for drawing vertical lines
stroke width, dash properties and colour (if unspecified) have some randomisation*/
function makeColLine(x1,y1,x2,y2,RGB) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    RGB??= makeRGB();
    let colWidth = bbox.width/numCols;
    let rowHeight = bbox.height/numRows;
    let lineWidth = bbox.width/numCols*random(0,0.8);
    let strokeDash = `${random(2,6)},${random(10,60)},${random(1,4)}`
    line.setAttribute('x1',x1 * colWidth+colWidth/2);
    line.setAttribute('y1',y1 * rowHeight+rowHeight/2);
    line.setAttribute('x2',x2 * colWidth+colWidth/2);
    line.setAttribute('y2',y2 * rowHeight+rowHeight/2);
    line.setAttribute('stroke-width', lineWidth);
    if (lineWidth <= (bbox.width/numCols)/3){
        line.setAttribute('stroke-linecap', 'square');
    } else {
        line.setAttribute('stroke-linecap', 'butt');
    }
    line.setAttribute('stroke-dasharray', strokeDash);   
    line.setAttribute('stroke', RGB);
    svg.appendChild(line);
}

/*function for drawing vertical lines
stroke width, dash properties and colour (if unspecified) have some randomisation*/
function makeRowLine(x1,y1,x2,y2,RGB) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    RGB??= makeRGB();
    let colWidth = bbox.width/numCols;
    let rowHeight = bbox.height/numRows;
    let lineWidth = bbox.width/numCols*random(0,0.8);
    let strokeDash = `${random(2,6)},${random(10,60)},${random(1,4)}`
    line.setAttribute('x1',x1 * colWidth+colWidth/2);
    line.setAttribute('y1',y1 * rowHeight+rowHeight/2);
    line.setAttribute('x2',x2 * colWidth+colWidth/2);
    line.setAttribute('y2',y2 * rowHeight+rowHeight/2);
    line.setAttribute('stroke-width', lineWidth);
    if (lineWidth <= (bbox.height/numRows)/3){
        line.setAttribute('stroke-linecap', 'square');
    } else {
        line.setAttribute('stroke-linecap', 'butt');
    }
    line.setAttribute('stroke-dasharray', strokeDash);  
    line.setAttribute('stroke', RGB );
    svg.appendChild(line);
}

//function to draw all cells to the svg canvas
function makeAllCells() {
    for (let x = 0; x < numCols; x++) {
        // gridArray[x] = [];
        for (let y = 0; y < numRows; y++){
            // gridArray[x][y] = Math.round(Math.random());
            makeCell(x,y);
        }
    }
}

//function to draw all lines to the to the svg canvas
function drawAllLines(numRows, numCols){
    /*for loop draws column and row alternately, with some conditional tests assigning
    either a black or white value
    */
    for (let i = 0; i < numCols; i++) {
        let colValRow;
        let colValColumn;
        if (i%2==0){
            colValColumn = 'rgb(127,127,127)';
            colValRow = 'rgb(255,255,255)';
        } else {
            colValColumn = 'rgb(255,255,255)';
            colValRow = 'rgb(127,127,127)';
        }

        makeColLine(i,0,i,numCols-1,colValColumn);
        makeRowLine(0,i,numRows-1,i,colValRow);
        
    }

}

let animCount = 0;

function sketch(){
    svg.replaceChildren();
    drawAllLines(numRows, numCols);
    makeAllCells();
    animCount++;
    res = Math.round(random(1,10));
    numCols = res;
    numRows = res;
}




///////////////////////CSS FILTER AND BUTTON INTERACTIONS////////////////

//speed of playback for SVG animation
let stepInterval = 250;
let svgAnimation;

let funButton = document.getElementById("button1");

let isPlaying;

//sets the animation to play with colour SVG and faster framerate
funButton.addEventListener("click", function(e) {
    if(!isPlaying){
        turnSVGgreyOff();
        svgAnimation = setInterval(sketch,stepInterval);
    }
    isPlaying = true;
});

function turnSVGgreyOff(){
    svg.style.filter= "grayscale(0%)";
}

let noFunButton = document.getElementById("button2")

//sets the animation to play with grayscale SVG and slower framerate
noFunButton.addEventListener("click", function(e) {
    turnSVGgrey();
    clearInterval(svgAnimation);
    isPlaying= false;
});

function turnSVGgrey(){
    svg.style.filter= "grayscale(100%)";
}


///////////////////////TONE JS///////////////////

let playButton1 = document.getElementById("button3")
playButton1.onclick = play1;

let notes1 = ['C2', 'C3', 'D3', 'G2', 'A#2']

function getRandNote1() {
    let randNote = notes1[Math.round(random(notes1.length-1))];
    return randNote;
}

//gain nodes for volume control
const gainNode = new Tone.Gain(0.6).toDestination();
const gainNode3 = new Tone.Gain(0.2).toDestination();

//FX
const chorus = new Tone.Chorus(4, 2.5, 0.5).connect(gainNode)
let randomFreq = random(200,1000);
const filter = new Tone.Filter(randomFreq, 'bandpass').connect(gainNode3);
const autoFilter = new Tone.AutoFilter("2n").connect(gainNode3);
const feedbackDelay = new Tone.FeedbackDelay(0.5, 0.6).connect(gainNode3);

//envelope for synth1
const env1 = new Tone.AmplitudeEnvelope({
    attack: 0.005,
    decay: 0.04,
    sustain: 1,
    release: 0.1
}).chain(autoFilter, feedbackDelay, filter);


function musicMachine1() {

    // synthNote = getRandNote1();
    // pulseWidthMod = random();

    console.log(`synth note = ${synthNote}`)
    console.log(`synth note = ${synthNote}`)
    
    
    env1.triggerAttack();
    env1.releaseCurve = [1, 0.3, 0.1, 0.06, 0.03, 0];
    env1.decayCurve = "exponential";
    setTimeout(() => {
        env1.triggerRelease();
    }, 20
    
    )
    
}

let synthNote = getRandNote1();
let pulseWidthMod = random();

/*create a pulswave oscillator voice and connect to an amplitude envelope. Pulsewidth is given a random value
an the frequency of the oscillator is created by converting a note randomly chosen by the getRandNote
function from the notes1 list, and converted to the Frequency value expected by the PulseOscillator*/
const synth1 = new Tone.PulseOscillator(Tone.Frequency(synthNote), pulseWidthMod).connect(env1).start();


function play1() {
    // loops.forEach( loop => loop.stop() )
    // Start Tone and then call the musicMachine function once it is ready to go.
    //  (Remember that an interaction event is required to start it up!)
    // Tone.start().then(musicMachine1);

    for (let i=0; i<10; i++) {
        setTimeout(() => {
            Tone.start().then(musicMachine1);
            synth1.width.value=random();
            synth1.frequency.value=Tone.Frequency(getRandNote1());
            randomFreq = random(200,10000);
        }, 250 * i)
    }
}

