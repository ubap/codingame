#!/usr/bin/python3
import sys
import math

sequence = input()

tags_weights = {}
tags_stack = []
i = 0
while i < len(sequence):
    character = sequence[i]
    if character.isalpha():
        tags_stack.append(character)
        if not character in tags_weights:
            tags_weights[character] = []
        tags_weights[character].append(len(tags_stack))
    else:
        i += 1
        tags_stack.pop()
    i += 1

# get heaviest character
heaviest_character = ''
heaviest_character_weight = -1
for character in tags_weights:
    sum = 0
    for weight in tags_weights[character]:
        sum += 1.0 / weight
    if sum > heaviest_character_weight:
        heaviest_character_weight = sum
        heaviest_character = character

print(heaviest_character)