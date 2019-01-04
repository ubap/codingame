function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
//////////////////////////////////////////////////////////////////

function cardWeightOnTable(table) {
    var card = table[table.length-1].slice(0, -1);
    if (card === "J") return 11;
    if (card === "Q") return 12;
    if (card === "K") return 13;
    if (card === "A") return 14;
    return parseInt(card);
}

var player1Deck = [];
const n = parseInt(readline()); // the number of cards for player 1
for (let i = 0; i < n; i++) {
    const cardp1 = readline(); // the n cards of player 1
    player1Deck.push(cardp1);
}

var player2Deck = [];
const m = parseInt(readline()); // the number of cards for player 2
for (let i = 0; i < m; i++) {
    const cardp2 = readline(); // the m cards of player 2
    player2Deck.push(cardp2);
}

try {
    var nRounds = 0;
    while (!(player1Deck.length == 0 || player2Deck.length == 0)) {
        nRounds += 1;
        var player1Table = [];
        var player2Table = [];

        while (true) {
            player1Table.push(player1Deck.shift());
            player2Table.push(player2Deck.shift())
            
            var p1Weight = cardWeightOnTable(player1Table);
            var p2Weight = cardWeightOnTable(player2Table);
            if (p1Weight > p2Weight) {
                player1Deck.push(...player1Table);
                player1Deck.push(...player2Table);
                break;
            } else if (p2Weight > p1Weight) {
                player2Deck.push(...player1Table);
                player2Deck.push(...player2Table);
                break;
            } else for (var i = 0; i < 3; i++) {
                player1Table.push(player1Deck.shift());
                player2Table.push(player2Deck.shift())
            }
        
        }
    }

    if (player1Deck.length == 0)
        print("2 " + nRounds);
    else if (player2Deck.length == 0)
        print("1 " + nRounds);
    else
        print('PAT');
} catch(err) {
    print('PAT');
}