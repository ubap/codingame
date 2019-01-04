#!/usr/bin/python3

def insert_triangle(rows, startx, starty, size):
    for i in range(0, size):
        x = startx - i
        y = starty + i
        for j in range(0, (i*2) + 1):
            rows[y][x + j] = '*'

# parse input
rows = []
n = int(input())
# prepare mem buffs
for i in range(0, n * 2):
    rows.append([' '] * ((n * 4) - 1))
rows[0][0] = '.'

# insert triangles
insert_triangle(rows, (2*n) - 1, 0, n)
insert_triangle(rows, n-1, n, n)
insert_triangle(rows, (n * 3) - 1, n, n)

# print triangles
for i in range(0, n * 2):
    row = "".join(rows[i]).rstrip()
    print(row)