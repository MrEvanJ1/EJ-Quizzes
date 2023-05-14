class Particle {
    constructor(xPos, yPos, radius) {
        // defining properties:
        this.x = xPos;
        this.y = yPos;
        this.r = radius;
        
        //SVG element
        this.svgElement;
        
        //animation duration
        this.animDuration = random(5,10);
        
        //target x and y positions
        this.targetX = random(0, width);
        this.targetY = random(0, height);

    }

    //creates the circle element and appends to SVG element
    drawParticle() {
        this.svgElement = makeCircle(this.x, this.y, this.r);
        svg.appendChild(this.svgElement);
        //calls the addAnimate X and addAnimateY methods defined later
        this.addAnimateX();
        this.addAnimateY();
        this.addAnimateYFall();
        this.addAnimationRadius();
    }

    //creates animate element for the cx attribute of the circle and appends to the svg element created within the class
    addAnimateX() {
        let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        
        //specifying what it is which will be animated (cx) using the <animate> element's 'attributeName' attribute.
        animElement.setAttribute('attributeName', 'cx');
        
        //specifying the 'from' and 'to' taget values for the attribute identified with attributeName
        animElement.setAttribute('values', `${this.x}; ${this.targetX}`);

        
        //specifies the duration of the animation specifies in 'values' step above
        animElement.setAttribute('dur', `${this.animDuration}`);

        //specifies the repitition behaviour of the animation
        animElement.setAttribute('repeatCount', 'indefinite');

        //appending the resulting animation characteristics to this.svgElement
        this.svgElement.appendChild(animElement);

    }

    //as above in 'addAnimateX() but for the cy attribute of the circle'
    addAnimateY() {
        let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animElement.setAttribute('attributeName', 'cy');
        animElement.setAttribute('values', `${this.y}; ${this.targetY}`);
        animElement.setAttribute('dur', `${this.animDuration}`);
        animElement.setAttribute('repeatCount', 'indefinite');
        this.svgElement.appendChild(animElement);
    }

    addAnimateYFall() {
        let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animElement.setAttribute('attributeName', 'cy');
        animElement.setAttribute('values', `${this.targetY}; ${height}`);
        animElement.setAttribute('dur', `${this.animDuration}`);
        animElement.setAttribute('repeatCount', 'indefinite');
        this.svgElement.appendChild(animElement);
    }

    addAnimationRadius() {
        let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animElement.setAttribute('attributeName', 'r');
        animElement.setAttribute('values', `0; ${this.r};  ${this.r*2}`);
        animElement.setAttribute('dur', `${this.animDuration}`);
        animElement.setAttribute('repeatCount', 'indefinite');
        this.svgElement.appendChild(animElement);
    }    

}

// function to create array of particle instances

function createParticlesArray(num) {
    let particleInstances = [];

    for (let i=0; i < num; i++) {
        //initialise the particle positions to be in the middle of SVG canvas
        let particleX = width/2;
        let particleY = height/2;
        //multiplying width to define a random range of potential particle sizes on initialisation (scales with width of canvas)
        let particleSize = random(width* 0.004, width *0.02);
        //push to end of particleInstances array
        particleInstances.push(new Particle(particleX, particleY, particleSize));
    }
    
    return particleInstances;

}


//scales with width of the browser window
let width = window.innerWidth;
//scales with height of the browser window
let height = window.innerHeight;

//reference to svg element in HTML doc
const svg = document.getElementById("base-svg");

//setting the dimensions of the svg element in HTML doc
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("style", "background-color: black");

// calls createParticlesArray() function creating the array of particle instances
let particles = createParticlesArray(50);

//calls the drawParticle() method for each particle insance in the array
for (let particle of particles) {
    particle.drawParticle();
}
