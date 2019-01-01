#!/usr/bin/python3
import sys
import math

def calc_dists(position, coords):
    for i in range(len(coords)):
        coord = coords[i]
        dist = math.sqrt(math.pow(position[0] - coord[0], 2) + math.pow(position[1] - coord[1], 2))
        coords[i] = [coord[0], coord[1], dist]


coords = []
n = int(input())
for i in range(n):
    x, y = [int(j) for j in input().split()]
    coords.append([x, y, 0])

position = start = coords[0]
dist = 0
while len(coords) != 0:
    position = coords.pop(0)
    dist += position[2]
    calc_dists(position, coords)
    coords.sort(key=lambda coord: coord[2])

coords.append(start)
calc_dists(position, coords)
dist += coords.pop(0)[2]

# print result
print(math.floor(dist + 0.5))