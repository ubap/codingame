#!/usr/bin/python3
import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

intext = input()

finished = False
while not finished:
    finished = True

    # * Only a single space between words (remove excessive spaces);
    while True:
        edited = intext.replace("  ", " ")
        if edited == intext:
            break
        intext = edited

    # * No spaces before punctuation marks;
    punctation_marks = [",", "."]
    for punctaction_mark in punctation_marks:
        intext = intext.replace(" " + punctaction_mark, punctaction_mark)

    intext = list(intext.lower())
    # add whitespaces after punctation marks
    i = 0
    while i < len(intext) - 1:
        if intext[i] in punctation_marks and intext[i+1] != " ":
            intext.insert(i+1, " ")
            i+=1
        i+= 1

    #  Use only lowercase letters, except for the beginning of the sentence (after a dot);
    intext[0] = intext[0].upper()
    for i in range(0, len(intext) - 2):
        if intext[i] == '.':
            intext[i+2] = intext[i+2].upper()
    
    # Remove duplicate puncation marks
    for i in range(0, len(intext) - 2):
        if intext[i] in punctation_marks:
            if not intext[i+2].isalpha():
                finished = False
                intext[i] = " "

    intext = "".join(intext)

print(intext)