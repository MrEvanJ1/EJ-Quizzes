'use strict';


class ECA {
    constructor(ruleSet, rowLength) {
        this.rules = ruleSet
        this.row = new Array(rowLength).fill(0);

        let centerIndex = Math.floor(rowLength/2);
        this.row[centerIndex] = 1;

        for(let i=0; i< this.row.length; i++){
            //some added variation to the CA by skipping 
            this.row[i] = Math.round(Math.random());
        }
    }

    transformCell(triple) {
        return this.rules[triple.join('')]
    }

    generateNextRow() {
        let nextGeneration = new Array(this.row.length).fill(0);
        for(let i =0; i< nextGeneration.length; i++) {
            let left = i > 0 ? this.row[i-1] : 0;
            let middle = this.row[i];
            let right = i < this.row.length-1 ? this.row[i+1] : 0;
            nextGeneration[i] = this.transformCell([left,middle,right]);
        }
        this.row = nextGeneration;
    }
}

