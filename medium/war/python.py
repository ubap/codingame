#!/usr/bin/python3
import sys
import math

def card_weight_on_table(deck):
    card = deck[len(deck) - 1][:-1]
    if card == "J":
        return 11
    if card == "Q":
        return 12
    if card == "K":
        return 13
    if card == "A":
        return 14
    return int(card)

player1_deck = []
n = int(input())  # the number of cards for player 1
for i in range(n):
    cardp_1 = input()  # the n cards of player 1
    player1_deck.append(cardp_1)

player2_deck = []
m = int(input())  # the number of cards for player 2
for i in range(m):
    cardp_2 = input()  # the m cards of player 2
    player2_deck.append(cardp_2)

try:
    n_rounds = 0
    while (not (len(player1_deck) == 0 or len(player2_deck) == 0)):
        n_rounds += 1
        player1_table = []
        player2_table = []
        
        while True:
            player1_table.append(player1_deck.pop(0))
            player2_table.append(player2_deck.pop(0))

            p1_weight = card_weight_on_table(player1_table)
            p2_weight = card_weight_on_table(player2_table)
            if p1_weight > p2_weight:
                player1_deck.extend(player1_table)
                player1_deck.extend(player2_table)
                break
            elif p2_weight > p1_weight:
                player2_deck.extend(player1_table)
                player2_deck.extend(player2_table)
                break
            else:
                for i in range(0, 3):
                    player1_table.append(player1_deck.pop(0))
                    player2_table.append(player2_deck.pop(0))


    if len(player1_deck) == 0:
        print("2 " + str(n_rounds))
    elif len(player2_deck) == 0:
        print("1 " + str(n_rounds))
    else:
        print("PAT")
except IndexError:
    print("PAT")