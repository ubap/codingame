#!/usr/bin/python3

import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

numbers = []
n = int(input())
for i in input().split():
    x = int(i)
    numbers.append(x)

numbers.sort()
weights = 0

while len(numbers) != 1:
    sum = numbers.pop(0) + numbers.pop(0)
    weights += sum
    numbers.append(sum)
    numbers.sort()

# Write an action using print
# To debug: print("Debug messages...", file=sys.stderr)

print(weights)