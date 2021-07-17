import { question } from 'readline-sync'

function readline() {
    return question('');
}


//------------------------

function getCounts(row:string) : number[] {
    const numbers: number[] = [];
    for (var i:number = 0; i < row.length; i++) {
       var char = row.charAt(i);
       if (char == '1') {
        numbers.push(i);
       }
    }
    return numbers;
}

function getNumberOfNeighbours(map:string[][], x:number, y:number) : number {
    var numberOfNeighbours:number = 0;
    if (x-1 >= 0 && y-1 >= 0                      && map[y-1][x-1] === 'O') numberOfNeighbours++;
    if (x-1 >= 0                                 && map[y  ][x-1] === 'O') numberOfNeighbours++;
    if (x-1 >= 0 && y+1 < map.length             && map[y+1][x-1] === 'O') numberOfNeighbours++;

    if (y-1 >= 0                                 && map[y-1][x] === 'O') numberOfNeighbours++;
    if (y+1 < map.length                        && map[y+1][x] === 'O') numberOfNeighbours++;

    if (x+1 < map[y].length && y-1 >= 0          && map[y-1][x+1] === 'O') numberOfNeighbours++;
    if (x+1 < map[y].length                     && map[y  ][x+1] === 'O') numberOfNeighbours++;
    if (x+1 < map[y].length && y+1 < map.length && map[y+1][x+1] === 'O') numberOfNeighbours++;

    return numberOfNeighbours;
}

 var inputs: string[] = readline().split(' ');
 const h: number = parseInt(inputs[0]);
 const w: number = parseInt(inputs[1]);
 const n: number = parseInt(inputs[2]);

 const alive: string = readline();
 const dead: string = readline();

 const aliveCounts = getCounts(alive);
 const deadCounts = getCounts(dead);


 // parse map into memory
 var map: string[][] = [];

 for (let i = 0; i < h; i++) {
     const line: string = readline();
     map.push([]);
     for (let j = 0; j < line.length; j++) {
         var char = line.charAt(j);
         map[i].push(char);
     }
 }
 

 // process turns
 for (let turn = 0; turn < n; turn++) {
 const mapAfterTurn: string[][] = [];
    for (let i = 0; i < map.length; i++) {
        mapAfterTurn.push([]);
        for (let j = 0; j < map[i].length; j++) {
            var numberOfNeighbours:number = getNumberOfNeighbours(map, j, i);
            if (map[i][j] === 'O') {
                if (aliveCounts.indexOf(numberOfNeighbours) == -1) {
                    mapAfterTurn[i].push('.');
                } else {
                    mapAfterTurn[i].push('O');
                }
            }
            if (map[i][j] === '.') {
                if (deadCounts.indexOf(numberOfNeighbours) == -1) {
                    mapAfterTurn[i].push('.');
                } else {
                    mapAfterTurn[i].push('O');
                }
            } 
        }
    }

    map = mapAfterTurn;
}



for (let i = 0; i < map.length; i++) {
    var row:string = "";
    for (let j = 0; j < map[i].length; j++) {
        row = row + map[i][j];
    }
    console.log(row);
}