#!/usr/bin/python3
import sys
import math

size = int(input())
angle = int(input())
rows = []
for i in range(size):
    line = list(input().replace(" ", ""))
    rows.append(line)

# how many times rotate
rotate = angle // 90
rotate %= 4

for i in range(0, rotate):
    tmp_rows = []
    # init tmp rows
    for row in range(0, size):
        tmp_rows.append([None] * size)

    for row in range(0, size):
        for col in range(0, size):
            tmp_rows[size-col-1][row] = rows[row][col]
    rows = tmp_rows

# print diamond
for i in range(1, size+1):
    for j in range(0, size-i):
        print(" ", end="")
    separator = ""
    for j in range(0, i):
        y = j
        x = size+j-i
        print(separator + rows[y][x], end="")
        separator = " "
    for j in range(0, size-i):
        print(" ", end="")
    print("")

for i in range(1, size):
    for j in range(0, i):
        print(" ", end="")
    separator = ""
    for j in range(i, size):
        y = j
        x = j-i
        print(separator + rows[y][x], end="")
        separator = " "
    for j in range(0, i):
        print(" ", end="")
    print("")