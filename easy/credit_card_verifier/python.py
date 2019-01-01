#!/usr/bin/python3
import sys
import math

n = int(input())
for i in range(n):
    card = input().replace(" ", "")
    if len(card) != 16:
        print("NO")
        continue
    # luhns algo
    sum = 0
    for i in range(0, 15, 2):
        doubled = int(str(card[i])) * 2
        if doubled > 9:
            doubled = doubled - 9
        sum += doubled
        sum += int(str(card[i + 1]))
    if sum % 10 == 0:
        print("YES")
    else:
        print("NO")
