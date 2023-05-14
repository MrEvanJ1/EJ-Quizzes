//retrieving the 
let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let stepInterval = 500;
let myAnimation;
let isPlaying = false;

//listener for play button and corresponding function below
playButton.addEventListener("click", startAnim);

function startAnim() {
    if(!isPlaying){
        myAnimation = setInterval(drawFullCA,stepInterval);
    }
    isPlaying = true;
}

//listener for stop button and corresponding function below
stopButton.addEventListener("click",stopAnim);

function stopAnim() {
    clearInterval(myAnimation);
    svg.replaceChildren();
    isPlaying = false;
}


//four rule sets for four different flavours of elementary cellular automata
let ruleSet = {
    "000": 0,
    "001": 1,
    "010": 0,
    "100": 1,
    "011": 1,
    "101": 0,
    "110": 1,
    "111": 0
}

let ruleSet2 = {
    "000": 1,
    "001": 0,
    "010": 0,
    "100": 1,
    "011": 1,
    "101": 0,
    "110": 1,
    "111": 0
}

let ruleSet3 = {
    "000": 1,
    "001": 0,
    "010": 1,
    "100": 0,
    "011": 0,
    "101": 1,
    "110": 1,
    "111": 1
}

let ruleSet4 = {
    "000": 1,
    "001": 1,
    "010": 0,
    "100": 0,
    "011": 1,
    "101": 0,
    "110": 0,
    "111": 1
}

//array to store all rule sets
let ruleSetList = [ruleSet,ruleSet2,ruleSet3,ruleSet4]

//randomly chosen rule set
let chosenRuleSet = ruleSetList[Math.round(random(ruleSetList.length-1))]

//sets the resolution of the automata display
let sizeParam = 50

// Create the cellular automata with the rule set and how long to make each row.
let ca = new ECA(chosenRuleSet, sizeParam);

//retrieves SVG element
const svg = document.getElementById("display");

//sets width applied to display elements to the browser width and height
const width = window.innerWidth;
const height = window.innerHeight;

svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.style.backgroundColor = "rgb(0,0,0)";

// Calculate the dimensions of each cell and how many iterations will be required.
let cellSize = width / ca.row.length;
let rowLimit = height / cellSize;

//css styling of grayscale and colour inversion (changed dynamically in drawFullCA() function)
let randGreyscale;
let randInversion;

//counter to allow for musical timings or animations based on the number of times drawFullCA() is called
let animCounter = 0

function drawFullCA(){
    svg.replaceChildren();
    let rowCount = 0
    for (let drawRow = 0; drawRow < rowLimit; drawRow++){
        // Consider each cell of the automata and add the alive cells to the SVG.
        ca.row.forEach( (cell, i) => {
            //Only draw alive tiles, keep the number of SVG elements to a minimum, else the browser starts to lag!
            if(cell === 1){
                let svgCell = square(i*cellSize, drawRow * cellSize, cellSize);
                svg.appendChild(svgCell);
            }
        
        });
        
        ca.generateNextRow();

    }
    
    //gives random values to the css filter on the automata display
    randGreyscale = random(0,100);
    randInversion = random(0,100);

    //applies CSS filter to image based on odd or even numbers of the animation runs counter (animCounter)
    if(chosenRuleSet[100]==1){
        svg.style.filter= "grayscale(" + `${randGreyscale}`+ "%) invert(" + `${randInversion}` + "%)";
    }
    
    
    //sums together all of the 1's in the last cellular automata row
    let rowSum = ca.row.reduce(function(a, b){
        return a + b;
    });
    
    /*music machine 1 heard if the current rule set begins with a 1 and the sum of all of the 1's in the last CA row
    is more than half the value of ca.row.length */
    if (chosenRuleSet[100]==0 && rowSum>=ca.row.length/2){
        Tone.start().then(musicMachine1);
    }
    
    /*attempts to have the plucky pingpong delay sound only heard when the CA is multicoloured against a black background
    */
    if(randGreyscale<35 && randInversion<20){
        // console.log('event2')
        Tone.start().then(musicMachine2);
    }    
    
    //randomly selects the next ruleset used for the CA
    chosenRuleSet = ruleSetList[Math.round(random(ruleSetList.length-1))]
    ca = new ECA(chosenRuleSet, sizeParam)
    
    animCounter++;

    //snare sound heard only every 2nd interval
    if (animCounter%2==0) {
        Tone.start().then(musicMachine4);
    }

    //kick sound heard every interval
    Tone.start().then(musicMachine3);

    sizeParam = Math.round(random(30,70));
    cellSize = width / ca.row.length;
    rowLimit = height / cellSize;

}


// Tone.js code
//////////////////////////////////////////////////////////////////////////////////

//array of notes for musicMachine1
let notes1 = ['C2', 'C3', 'D3', 'G2', 'A#2']

function getRandNote1() {
    let randNote = notes1[Math.round(random(notes1.length-1))];
    return randNote;
}

//array of notes for musicMachine2
let notes2 = ['C5', 'C6', 'C#5', 'G2', 'A#2']

function getRandNote2() {
    let randNote = notes2[Math.round(random(notes2.length-1))];
    return randNote;
}
// Create a gain node so that we can turn down the signal. Otherwise, we'll introduce digital distortion by clipping on the way out of the computer.
const gainNode = new Tone.Gain(0.6).toDestination();
// const gainNode2 = new Tone.Gain(0.2).toDestination();
const gainNode3 = new Tone.Gain(0.3).toDestination();

// FX
const chorus = new Tone.Chorus(4, 2.5, 0.5).connect(gainNode)
const pingPong = new Tone.PingPongDelay("8n", 0.5).connect(gainNode);
const reverb = new Tone.Reverb(4).connect(gainNode3);
const filter = new Tone.Filter(1200, 'bandpass').connect(gainNode3);
const autoFilter = new Tone.AutoFilter("2n").connect(gainNode3);
const feedbackDelay = new Tone.FeedbackDelay(0.25, 0.2).connect(gainNode3);
const filter2 = new Tone.Filter(450, 'lowpass').connect(gainNode3);


//envelope for pulswave oscillator voice used in music machine 1
//Instruments and envelopes
const env1 = new Tone.AmplitudeEnvelope({
    attack: 0.05,
    decay: 0.25,
    sustain: 0.3,
    release: 0.8
}).chain(autoFilter, feedbackDelay, filter);


/*create a pulswave oscillator voice and connect to an amplitude envelope. Pulsewidth is given a random value
an the frequency of the oscillator is created by converting a note randomly chosen by the getRandNote
function from the notes1 list, and converted to the Frequency value expected by the PulseOscillator*/
const synth1 = new Tone.PulseOscillator(Tone.Frequency(getRandNote1()), random()).connect(env1).start();

//pulsewidth oscillator synth sound with a short envelope. Signal goes into chain of filters and feedback delay
function musicMachine1() {
    // synth1.frequency=Tone.Frequency(getRandNote1());
    env1.triggerAttack();
    env1.releaseCurve = [1, 0.3, 0.1, 0.06, 0.03, 0];
    env1.decayCurve = "exponential";
    setTimeout(() => {
        env1.triggerRelease();
    }, 20)
    synth1.width.value=random();
    synth1.frequency.value=Tone.Frequency(getRandNote1());
}


//thin pluck sounding voice
const plucky = new Tone.PluckSynth().chain(pingPong,reverb);

function musicMachine2() {
    // const plucky = new Tone.PluckSynth().connect(gainNode);
    plucky.triggerAttack(getRandNote2())
    feedbackDelay.feedback.value = random(0.05,0.7)
}


const membSynth = new Tone.MembraneSynth().connect(filter2);
// kick drum
function musicMachine3() {
    membSynth.triggerAttackRelease("C1", "16n");
}


//envelope used by Pink noise for snare sound
const env2 = new Tone.AmplitudeEnvelope({
    attack: 0.02,
    decay: 0.15,
    sustain: 0.5,
    release: random(5)
    // release: random(0.08,0.5)
}).chain(gainNode3);
//PINK noise usedfor snare sound
const noisePink = new Tone.Noise({
    volume: -10,
    type: "pink"
}).connect(env2).start();

// snaree-like white noise
function musicMachine4() {
    //trigger
    env2.triggerAttack();
    env2.releaseCurve = [1, 0.3, 0.1, 0.06, 0.03, 0];
    env2.decayCurve = "exponential";
    setTimeout(() => {
        env2.triggerRelease();
    }, 30)
    env2.release=random(0.05,1)

}
