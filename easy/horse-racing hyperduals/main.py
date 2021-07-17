#!/usr/bin/env python2.7
def main():
    min_dist = 100000000
    points = []
    n = int(raw_input())
    for i in xrange(n):
        v, e = [int(j) for j in raw_input().split()]
        for point in points:
            dist = abs(point[0] - v) + abs(point[1] - e)
            if dist < min_dist:
                min_dist= dist
        points.append([v, e])
    print min_dist


if __name__ == '__main__':
    main()
