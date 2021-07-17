import { question } from 'readline-sync'

function readline() {
    return question('');
}

//---------------

function followPath(map:string[], startRow:number, startCol:number) :number {
    
    var currRow = startRow;
    var currCol = startCol;
    var pathLength:number = 0;

    do {
        if (currCol < 0 || currRow < 0 || currRow >= map.length || currCol >= map[currRow].length) throw new Error();

        const currentTile:string = map[currRow].charAt(currCol);
        if (currentTile === '^') { currRow--; pathLength++; }
        else if (currentTile === 'v') { currRow++; pathLength++; }
        else if (currentTile === '<') { currCol--; pathLength++; }
        else if (currentTile === '>') { currCol++; pathLength++; }
        else if (currentTile === 'T') return pathLength;
        else throw new Error();

    } while (true);
}


var inputs: string[] = readline().split(' ');
const width: number = parseInt(inputs[0]);
const height: number = parseInt(inputs[1]);


var inputs: string[] = readline().split(' ');
const startRow: number = parseInt(inputs[0]);
const startCol: number = parseInt(inputs[1]);

const numberOfMaps: number = parseInt(readline());

const maps: string[][] = [];

for (let i = 0; i < numberOfMaps; i++) {
    const map: string[] = [];
    for (let j = 0; j < height; j++) {
        const mapRow: string = readline();
        map.push(mapRow);
    }

    maps.push(map);
}


const pathLengths:number[] = [];
for (let i = 0; i < numberOfMaps; i++) {
    try {
        const pathLen = followPath(maps[i], startRow, startCol);
        pathLengths.push(pathLen);
    } catch (e) {
        pathLengths.push(null);
    }
}

var shortestPathLen:number = Number.MAX_VALUE;
var shortestPathIndex:number = null;

for (let i = 0; i < pathLengths.length; i++) {
    if (pathLengths[i] != null) {
        if (pathLengths[i] < shortestPathLen) {
            shortestPathLen = pathLengths[i];
            shortestPathIndex = i;
        }
    }
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(shortestPathIndex == null ? 'TRAP' : shortestPathIndex);
