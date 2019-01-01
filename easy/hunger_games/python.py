#!/usr/bin/python3
import sys
import math

kills = {}
deaths = {}
player_names = []

tributes = int(input())
for i in range(tributes):
    player_name = input()
    player_names.append(player_name)
    kills[player_name] = []
    deaths[player_name] = None
turns = int(input())
for i in range(turns):
    info = input()
    tokens = info.split(" ")
    killer = tokens[0]
    for j in range(0, len(tokens) - 2):
        killed = tokens[2 + j]
        killed = killed.replace(",", "")
        kills[killer].append(killed)
        deaths[killed] = killer

end = ""
player_names.sort()
for player_name in player_names:
    print("", end = end)
    end = "\n"
    kills[player_name].sort()
    print("Name: " + player_name)
    print("Killed: ", end ="")
    if len(kills[player_name]) == 0:
        print("None")
    else:
        separator = ""
        for killed in kills[player_name]:
            print(separator + killed, end ="")
            separator = ", "
        print("")
    if deaths[player_name]:
        print("Killer: " + deaths[player_name])
    else:
        print("Killer: Winner")