#!/usr/bin/python3
import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

types = {}

n = int(input())  # Number of elements which make up the association table.
q = int(input())  # Number Q of file names to be analyzed.
for i in range(n):
    # ext: file extension
    # mt: MIME type.
    ext, mt = input().split()
    ext = ext.lower()
    types[ext] = mt
for i in range(q):
    fname = input().lower()  # One file name per line.
    tokens = fname.split(".")
    if len(tokens) < 2:
        print("UNKNOWN")
    else:
        try:
            print(types[tokens[len(tokens) - 1]])
        except:
            print("UNKNOWN")